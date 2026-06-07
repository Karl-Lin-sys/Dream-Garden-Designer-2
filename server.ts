import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/design", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing GEMINI_API_KEY environment variable. Add it via Settings -> Secrets." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const { style, climate, spaceSize, specificDesires } = req.body;

      const prompt = `Design a dream garden with the following parameters:
      Style: ${style || "Modern"}
      Climate: ${climate || "Temperate"}
      Space Size: ${spaceSize || "Medium backyard"}
      Specific Desires: ${specificDesires || "Low maintenance"}

      Provide a detailed layout, a planting list, and a brief description of the mood.`;

      // Generate textual response
      const textResponse = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              layoutText: { type: Type.STRING, description: "A few sentences describing the garden layout and structure" },
              plantingList: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 5-8 plants to use" },
              moodDesc: { type: Type.STRING, description: "One sentence describing the mood of the space" },
              imagePrompt: { type: Type.STRING, description: "A detailed single prompt optimized for generating a realistic image of this specific garden. Must include weather, lighting, plants, layout features, and style." }
            },
            required: ["layoutText", "plantingList", "moodDesc", "imagePrompt"]
          }
        }
      });

      let designResult = { layoutText: "", plantingList: [], moodDesc: "", imagePrompt: "" };
      if (textResponse.text) {
        designResult = JSON.parse(textResponse.text);
      }

      // Generate visualization
      const imgResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [
          { text: designResult.imagePrompt },
        ]
      });

      let imageUrl = null;
      if (imgResponse.candidates?.[0]?.content?.parts) {
        for (const part of imgResponse.candidates[0].content.parts) {
          if (part.inlineData) {
            imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            break;
          }
        }
      }

      const result = {
        ...designResult,
        imageUrl
      };

      res.json(result);
    } catch (e: any) {
      console.error("Error generating design:", e);
      res.status(500).json({ error: e.message || "Failed to generate design" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
