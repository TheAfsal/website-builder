import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor, Project, Page } from "../types";
// import mockGeminiAPI from "./mockGeminiAPI";

const PROJECT_ID = "DEMO_PROJECT_ID_EXPORT";

const saveToSessionStorage = async (projectId: string, project: Project) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  sessionStorage.setItem(projectId, JSON.stringify(project));
};

const loadFromSessionStorage = async (
  projectId: string
): Promise<Project | null> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const projectString = sessionStorage.getItem(projectId);
  return projectString ? JSON.parse(projectString) : null;
};

const EditorPage: React.FC = () => {
  const editorRef = useRef<Editor | null>(null);
  const [textareaValue, setTextareaValue] = useState("");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const location = useLocation();
  const {
    generatedHtml,
    websiteType = "basic",
    language = "English",
    theme = "modern",
    requirements = "basic structure",
  } = location.state || { generatedHtml: "<h1>New project</h1>" };

  // Initialize editor and set initial content
  // useEffect(() => {
  //   const editor = editorRef.current;
  //   console.log(editor);

  //   if (editor) {
  //     editor.on("load", () => {
  //       setIsEditorReady(true);
  //       console.log("Editor is ready");
  //       const homePage = editor.Pages.getAll().find(
  //         (p: Page) => p.getName() === "Home"
  //       );
  //       if (homePage) {
  //         const root = homePage.getMainComponent();
  //         if (root) {
  //           root.components(generatedHtml);
  //           console.log("Initial HTML set:", generatedHtml);
  //         }
  //       }
  //     });
  //   }
  //   return () => {
  //     if (editor) {
  //       editor.off("load");
  //     }
  //   };
  // }, [generatedHtml]);

  const handleGenerate = async (textareaValue) => {
    if (!textareaValue) {
      console.log("No query provided in textarea");
      return;
    }

    if (!isEditorReady || !editorRef.current) {
      console.error("Editor is not ready or instance not found");
      return;
    }

    const editor = editorRef.current;

    try {
      const homePage = editor.Pages.getAll().find(
        (p: Page) => p.getName() === "Home"
      );
      if (!homePage) {
        console.error("Home page not found");
        return;
      }

      const root = homePage.getMainComponent();
      if (!root) {
        console.error("Root component not found");
        return;
      }

      const response = await mockGeminiAPI(
        textareaValue,
        websiteType,
        language,
        theme,
        requirements
      );

      if (response.type === "full") {
        root.components(response.content);
        console.log("Entire website updated with:", response.content);
      } else if (response.selector) {
        const target = root.find(response.selector)[0];
        if (target) {
          target.replaceWith(response.content);
          console.log(
            `Updated ${response.selector} section with:`,
            response.content
          );
        } else {
          root.append(response.content);
          console.log(
            `Section ${response.selector} not found, appended content:`,
            response.content
          );
        }
      } else {
        root.append(response.content);
        console.log("Appended content to page:", response.content);
      }
    } catch (error) {
      console.error("Error processing Gemini response:", error);
    }

    console.log("Generate button clicked, textarea data:", textareaValue);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <StudioEditor
        ref={editorRef}
        style={{ height: "100%", width: "100%" }}
        options={{
          storage: {
            type: "self",
            autosaveChanges: 5,
            onSave: async ({
              project,
            }: {
              project: Project;
              editor: Editor;
            }) => {
              await saveToSessionStorage(PROJECT_ID, project);
              console.log("Project saved", { project });
            },
            onLoad: async () => {
              const project = await loadFromSessionStorage(PROJECT_ID);
              console.log("Project loaded", { project });
              return {
                project: project || {
                  pages: [{ name: "Home", component: generatedHtml }],
                },
              };
            },
          },
          project: {
            type: "web",
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
                      onClick: ({ editor }) =>
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
                  },
                  children: [
                    {
                      type: "sidebarLeft",
                    },
                    {
                      type: "canvasSidebarTop",
                    },
                    {
                      type: "sidebarRight",
                      style: {
                        width: "250px",
                        height: "500px",
                        minWidth: "200px",
                        maxWidth: "300px",
                        margin: 0,
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      },
                      children: [
                        {
                          type: "inputField",
                          id: "ai-sidebar-textarea",
                          name: "sidebarTextarea",
                          placeholder:
                            "Enter text (e.g., 'Update header', 'Update entire website')",
                          value: textareaValue,
                          style: {
                            fontSize: "14px",
                            padding: "8px",
                            minHeight: "100px",
                            width: "100%",
                          },
                          onChange: ({ value, setState }) => {
                            setTextareaValue(value);
                            handleGenerate(value);
                            setState({ value });
                            console.log("Textarea changed:", value);
                          },
                        },
                        {
                          type: "button",
                          label: "Generate",
                          variant: "primary",
                          onClick: handleGenerate,
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
  );
};

export default EditorPage;
