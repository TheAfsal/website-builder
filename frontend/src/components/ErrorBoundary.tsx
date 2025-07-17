import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="text-gray-600">
            An error occurred while loading the editor:{" "}
            {this.state.error?.message}
          </p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;


// import StudioEditor from "@grapesjs/studio-sdk/react";
// import "@grapesjs/studio-sdk/style";
// import { useEffect } from "react";

// const EditorPage = () => {
//   const PROJECT_ID = "DEMO_PROJECT_ID_EXPORT";

//   const getWebsiteKey = (env = "STAGE") => PROJECT_ID + "_WEBSITE_" + env;

//   const saveToSessionStorage = async (projectId, project) => {
//     sessionStorage.setItem(projectId, JSON.stringify(project));
//   };

//   const loadFromSessionStorage = async (projectId) => {
//     const projectString = sessionStorage.getItem(projectId);
//     return projectString ? JSON.parse(projectString) : null;
//   };

//   const publishWebsite = async (editor, env) => {
//     const files = await editor.runCommand("studio:projectFiles", {
//       styles: "inline",
//     });
//     const firstPage = files.find((file) => file.mimeType === "text/html");
//     const websiteData = {
//       lastPublished: new Date().toLocaleString(),
//       html: firstPage.content,
//       name:
//         sessionStorage.getItem(`${PROJECT_ID}_WEBSITE_NAME`) ||
//         "Unnamed Website",
//     };
//     sessionStorage.setItem(getWebsiteKey(env), JSON.stringify(websiteData));
//   };

//   const viewPublishedWebsite = (editor, env) => {
//     // ... (unchanged viewPublishedWebsite logic)
//   };

//   useEffect(() => {
//     const editor = window.editor; // Replace with ref or onInit if needed
//     if (editor) {
//       // Optional: Update textarea with selected text when RTE is enabled
//       editor.on("rte:enable", (view) => {
//         const textarea = document.querySelector("#website-name-textarea");
//         if (textarea && editor.RichTextEditor) {
//           const rte = editor.RichTextEditor;
//           const selection = rte.selection ? rte.selection() : "";
//           textarea.value = selection || "No text selected";
//         }
//       });
//     }
//   }, []);

//   return (
//     <StudioEditor
//       options={{
//         layout: {
//           default: {
//             type: "row",
//             style: { height: "100%" },
//             children: [
//               {
//                 type: "sidebarLeft",
//                 style: { alignItems: "center", justifyContent: "center" },
//                 children: [
//                   {
//                     type: "button",
//                     label: "Toggle Right Sidebar",
//                     variant: "outline",
//                     onClick: ({ editor }) =>
//                       editor.runCommand("studio:sidebarRight:toggle"),
//                   },
//                 ],
//               },
//               {
//                 type: "column",
//                 style: { flexGrow: 1 },
//                 children: [
//                   {
//                     type: "sidebarTop",
//                     style: {
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: 10,
//                     },
//                     children: [
//                       {
//                         type: "button",
//                         icon: "eye",
//                         variant: "outline",
//                         onClick: ({ editor }) =>
//                           editor.runCommand("core:preview"),
//                       },
//                       {
//                         type: "button",
//                         label: "Toggle Bottom Sidebar",
//                         variant: "outline",
//                         onClick: ({ editor }) =>
//                           editor.runCommand("studio:sidebarBottom:toggle"),
//                       },
//                     ],
//                   },
//                   {
//                     type: "row",
//                     style: { flexGrow: 1, overflow: "hidden" },
//                     children: [
//                       { type: "canvas", grow: true },
//                       {
//                         type: "sidebarRight",
//                         style: {
//                           alignItems: "center",
//                           justifyContent: "center",
//                           gap: 10,
//                         },
//                         children: [
//                           {
//                             type: "inputField",
//                             id: "sidebar-input",
//                             name: "sidebarInput",
//                             placeholder: "Enter text",
//                             className:
//                               "gs-utl-transition-colors gs-utl-cursor-text gs-utl-block gs-utl-p-1 gs-utl-px-2 gs-utl-rounded gs-theme-ring-focus focus:gs-utl-outline-none focus-visible:gs-utl-ring-2 gs-utl-ring-violet-300 gs-utl-ring-opacity-80",
//                             style: {
//                               width: "150px",
//                               fontSize: "14px",
//                               padding: "8px",
//                             },
//                             onChange: ({ value }) => {
//                               console.log("Input changed:", value);
//                             },
//                           },
//                           {
//                             type: "button",
//                             label: "Generate",
//                             variant: "primary",
//                             onClick: () => {
//                               const input =
//                                 document.querySelector("#sidebar-input");
//                               const value = input ? input.value : "";
//                               console.log(
//                                 "Generate button clicked, input data:",
//                                 value
//                               );
//                             },
//                           },
//                         ],
//                       },
//                     ],
//                   },
//                   {
//                     type: "sidebarBottom",
//                     style: { alignItems: "center", justifyContent: "center" },
//                     children: [
//                       {
//                         type: "button",
//                         label: "Toggle Top Sidebar",
//                         variant: "outline",
//                         onClick: ({ editor }) =>
//                           editor.runCommand("studio:sidebarTop:toggle"),
//                       },
//                     ],
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//       }}
//     />
//   );
// };

// export default EditorPage;
