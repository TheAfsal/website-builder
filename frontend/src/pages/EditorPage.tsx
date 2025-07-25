import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor } from "../types";
import { callGemini, loadProject, saveProject } from "@/services/builder.api";
import getOrCreateProjectId from "@/utils/createProjectIs";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

const EditorPage: React.FC = () => {
  const editorRef = useRef<Editor | null>(null);
  const inputTextRef = useRef("");
  const [textareaValue, setTextareaValue] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);

  const location = useLocation();
  const { generatedHtml, projectId } = location.state || {
    generatedHtml: "<h1>New project</h1>",
  };

  const PROJECT_ID = id || projectId || getOrCreateProjectId();

  console.log(PROJECT_ID);

  const saveToSessionStorage = async (projectId: any, project: any) => {
    try {
      return await saveProject(projectId, project);
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const loadFromSessionStorage = async (projectId: any) => {
    if (projectId) {
      try {
        return await loadProject(projectId);
      } catch (error) {
        console.error("Failed to save project:", error);
      }
    }
  };

  const handleGenerate = async (textareaValue: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selected = editor.getSelected();
    if (!selected) {
      alert("Please select a component.");
      return;
    }

    const button = document.getElementById("btn-generate") as HTMLButtonElement;
    if (button) {
      button.disabled = true;
      button.innerText = "Generating...";
    }

    //@ts-ignore
    const id = selected.getId();
    console.log("Component ID:", id);
    //@ts-ignore
    const selectedHtml = selected.toHTML();

    try {
      const response = await callGemini(textareaValue, selectedHtml);
      console.log("Gemini response:", response);

      switch (response.action) {
        case "updateStyle": {
          let { selector } = response.payload;
          const { style } = response.payload;
          const editor = editorRef.current;

          const wrapper = editor ? editor.getWrapper() : null;
          //@ts-ignore
          const wrapperId = wrapper?.getId?.();

          // Handle wrapper styling
          if (
            selector === "body" ||
            selector === `#${wrapperId}` ||
            selector === wrapperId
          ) {
            console.log("Applying style to wrapper");
            //@ts-ignore
            wrapper.addStyle(style);
            break;
          }

          // Normalize selector
          if (!selector.startsWith("#") && !selector.startsWith(".")) {
            selector = `#${selector}`;
          }
          //@ts-ignore
          const matched = wrapper.find(selector)?.[0];

          if (!matched) {
            alert(`Element with selector "${selector}" not found`);
            break;
          }

          matched.addStyle(style);
          break;
        }

        case "updateContent": {
          const { content } = response.payload;

          const selected = editor.getSelected();
          const wrapper = editor.getWrapper();
          const target = selected || wrapper;

          if (!target) {
            alert("No component selected for content update");
            break;
          }
          //@ts-ignore
          target.components(content);
          break;
        }

        case "rebuildComponent": {
          const { html } = response.payload;

          if (!html || typeof html !== "string") {
            alert("Invalid HTML in rebuildComponent payload");
            break;
          }

          const selected = editor.getSelected();
          const target = selected || editor.getWrapper();

          //@ts-ignore
          target.components(html);
          break;
        }

        case "deleteComponent":
          //@ts-ignore
          selected.remove();
          break;
        default: {
          alert("Sorry, I didn't understand that command.");
          break;
        }
      }
    } catch (err) {
      console.error("AI command failed:", err);
    } finally {
      if (button) {
        button.disabled = false;
        button.innerText = "Generate";
      }
    }
  };

  const handleEditorInit = (editorInstance: Editor) => {
    console.log("Editor initialized", editorInstance);
    editorRef.current = editorInstance;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: "60px",
          backgroundColor: "#282829",
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
        }}
      ></div>

      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        <StudioEditor
          onEditor={handleEditorInit}
          id="gjs-editor"
          style={{ height: "100%", width: "100%" }}
          options={{
            licenseKey: import.meta.env.VITE_EDITOR_KEY,
            project: {
              type: "web",
              id: PROJECT_ID,
            },
            identity: {
              id: user!.id,
            },
            assets: {
              storageType: "cloud",
            },
            storage: {
              type: "self",
              autosaveChanges: 5,
              onSave: async (props: any) => {
                const { project } = props;
                await saveToSessionStorage(PROJECT_ID, project);
                console.log("Project saved", { project });
              },
              onLoad: async () => {
                const project = await loadFromSessionStorage(PROJECT_ID);
                return {
                  project: project || {
                    pages: [{ name: "Home", component: generatedHtml }],
                  },
                };
              },
            },
            layout: {
              default: {
                type: "column",
                style: {
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  margin: 0,
                  padding: 0,
                },
                children: [
                  {
                    type: "sidebarTop",
                    style: {
                      height: "50px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottom: "1px solid #444",
                    },
                    children: [
                      {
                        type: "devices",
                        style: { width: "150px" },
                      },
                      {
                        type: "button",
                        label: "Preview",
                        variant: "outline",
                        style: {
                          borderColor: "white",
                          color: "white",
                          marginLeft: "10px",
                        },
                        onClick: ({ editor }: { editor: Editor }) =>
                          editor.runCommand("core:preview"),
                      },
                    ],
                  },
                  {
                    type: "row",
                    style: {
                      flexGrow: 1,
                      display: "flex",
                      margin: 0,
                      padding: 0,
                      overflow: "hidden",
                    },

                    children: [
                      {
                        type: "sidebarLeft",
                      },
                      {
                        type: "canvasSidebarTop",
                        style: {
                          flexGrow: 1,
                          overflow: "auto",
                        },
                      },
                      {
                        type: "sidebarRight",
                        style: {
                          width: "250px",
                          minWidth: "200px",
                          maxWidth: "300px",
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          overflowY: "auto",
                          overflowX: "hidden",
                          maxHeight: "100%",
                        },
                        children: [
                          {
                            type: "text",
                            content: "Generate Using AI",
                          },
                          {
                            type: "inputField",
                            id: "ai-sidebar-textarea",
                            name: "sidebarTextarea",
                            placeholder:
                              "Enter text (e.g., 'Change background color to blue')",
                            value: textareaValue,
                            onChange: ({
                              value,
                              setState,
                            }: {
                              value: string;
                              setState: (state: { value: string }) => void;
                            }) => {
                              setTextareaValue(value);
                              inputTextRef.current = value;
                              setState({ value });
                            },
                          },
                          {
                            type: "button",
                            label: "Generate",
                            variant: "primary",
                            id: "btn-generate",
                            onClick: () => handleGenerate(inputTextRef.current),
                          },
                          {
                            type: "panelStyles",
                            header: { label: "Styles" },
                            style: { padding: "10px" },
                          },
                          {
                            type: "panelProperties",
                            header: { label: "Properties" },
                            style: { padding: "10px" },
                          },
                          {
                            type: "panelAssets",
                            header: { label: "Assets" },
                            style: { padding: "10px" },
                            content: { itemsPerRow: 2 },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
