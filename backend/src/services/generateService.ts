import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export const generateContent = async (inputText: string, selectedHtml: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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
  const text = response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
};

export const generateWebsite = async (
  websiteType: string,
  theme: string,
  language: string,
  requirements: string
) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are a professional web UI designer helping generate GrapesJS-compatible HTML content.

Task:
Generate a complete and editable HTML layout for a "${websiteType}" website using "${theme}" theme and "${language}" as the language. Include these sections if applicable:
- Header with navigation
- Hero section with image and CTA button
- Product or service cards
- Testimonials
- Footer

Requirements:
${requirements || 'Basic structure with common UI components'}

Rules:
- Return only raw HTML. No Markdown, no CSS blocks, no JavaScript.
- Use semantic HTML5 tags (e.g., <header>, <section>, <footer>)
- Content must be editable in GrapesJS (no hardcoded styles inside <style> tags)
- Use inline styles or TailwindCSS classes (if possible)
- No explanation, return pure HTML only.
  `;

  const result = await model.generateContent([prompt]);
  let html = result.response.text().trim();
  html = html.replace(/^```html\n([\s\S]*?)\n```$/, '$1').trim();
  return html;
};