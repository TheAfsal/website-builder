import type { Request, Response } from "express";
import * as generateService from "../services/generateService";

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { inputText, selectedHtml } = req.body;
    const result = await generateService.generateContent(
      inputText,
      selectedHtml
    );
    res.status(200).json(result);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ action: "unknown", payload: {} });
  }
};

export const generateWebsite = async (req: Request, res: Response) => {
  try {
    const { websiteType, theme, language, requirements } = req.body;
    const html = await generateService.generateWebsite(
      websiteType,
      theme,
      language,
      requirements
    );
    res.json({ html });
  } catch (error) {
    console.error("Gemini generation error:", error);
    res.status(500).json({ error: "Generation failed" });
  }
};
