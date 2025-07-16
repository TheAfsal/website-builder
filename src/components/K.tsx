import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import StudioEditor from "@grapesjs/studio-sdk/react";
import "@grapesjs/studio-sdk/style";
import type { Editor, Project } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Call Gemini API
const callGemini = async (
  inputText: string,
  selectedHtml: string
): Promise<{ action: string; payload: any }> => {
  try {
    console.log("@@@", inputText);
    console.log(selectedHtml);
    const match = selectedHtml.match(/id=["']([\w-]+)["']/);
    const id = match ? match[1] : null;
    console.log("Extracted ID:", id);

    // const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    const genAI = new GoogleGenerativeAI(
      "AIzaSyDvF7rlh8Pe6CEpCC0iy8QfZVD2WT_aM1o"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are an expert UI assistant for GrapesJS (a web visual editor). Your job is to interpret user instructions and generate a JSON response to manipulate selected components in GrapesJS.

    **Rules:**
    - Respond ONLY with JSON. No extra text, markdown, or explanation.
    - The JSON must be valid and follow one of the following actions: "updateStyle", "updateContent", "replaceMedia", "rebuildComponent", "deleteComponent".
    - Use "body" or the actual selected component ID as the selector.

    **Format examples:**

    {
      "action": "updateStyle",
      "payload": {
        "selector": "body" or "component-id",
        "style": {
          "background-color": "pink"
        }
      }
    }

    {
      "action": "updateContent",
      "payload": {
        "content": "<h1>Updated Title</h1>"
      }
    }

    {
      "action": "rebuildComponent",
      "payload": {
        "html": "<section style='padding:20px; background-color:green;'><h1>Welcome</h1><p>This is editable.</p></section>"
      }
    }

    **User Instruction:**
    "${inputText}"

    **Selected Component HTML:**
    ${selectedHtml}
    `.trim();

    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    // Strip markdown code blocks if present
    const cleanedText = text.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (err) {
    console.error("Gemini API error:", err);
    return { action: "unknown", payload: {} };
  }
};

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
  const inputTextRef = useRef("");
  const [textareaValue, setTextareaValue] = useState("");

  const location = useLocation();
  const {
    generatedHtml,
    websiteType = "basic",
    language = "English",
    theme = "modern",
    requirements = "basic structure",
  } = location.state || { generatedHtml: "<h1>New project</h1>" };

  const mapComponentTypeToTag = (type: string): string => {
    const map: Record<string, string> = {
      navbar: "nav",
      hero: "section",
      "product-grid": "div",
      testimonials: "section",
      footer: "footer",
      image: "img",
      video: "video",
    };
    return map[type] || "div";
  };

  const handleGenerate = async (textareaValue: string) => {
    const editor = editorRef.current;
    if (!editor) return;

    const selected = editor.getSelected();
    if (!selected) {
      alert("Please select a component.");
      return;
    }

    const id = selected.getId(); // example: "igol"
    console.log("Component ID:", id);

    const selectedHtml = selected.toHTML();

    try {
      const response = await callGemini(textareaValue, selectedHtml);
      console.log("Gemini response:", response);

      switch (response.action) {
        case "updateStyle": {
          let { selector, style } = response.payload;
          const editor = editorRef.current;
          const wrapper = editor.getWrapper();
          const wrapperId = wrapper.getId?.();

          // Handle wrapper styling
          if (
            selector === "body" ||
            selector === `#${wrapperId}` ||
            selector === wrapperId
          ) {
            console.log("Applying style to wrapper");
            wrapper.addStyle(style);
            break;
          }

          // Normalize selector
          if (!selector.startsWith("#") && !selector.startsWith(".")) {
            selector = `#${selector}`;
          }

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

          // Replace existing component content with editable GrapesJS components
          target.components(html);
          break;
        }

        case "deleteComponent":
          selected.remove();
          break;
        default: {
          alert("Sorry, I didn't understand that command.");
          break;
        }
      }
    } catch (err) {
      console.error("AI command failed:", err);
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
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        display: "flex",
      }}
    >
      <StudioEditor
        onEditor={handleEditorInit}
        id="gjs-editor"
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
              return {
                project: project || {
                  pages: [{ name: "Home", component: generatedHtml }],
                },
              };
            },
          },
          project: { type: "web" },
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
                        minWidth: "200px",
                        maxWidth: "300px",
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
                            "Enter text (e.g., 'Change background color to blue')",
                          value: textareaValue,
                          style: {
                            fontSize: "14px",
                            padding: "8px",
                            minHeight: "100px",
                            width: "100%",
                          },
                          onChange: ({ value, setState }) => {
                            setTextareaValue(value);
                            inputTextRef.current = value;
                            setState({ value });
                          },
                        },
                        {
                          type: "button",
                          label: "Generate",
                          variant: "primary",
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
  );
};

export default EditorPage;
