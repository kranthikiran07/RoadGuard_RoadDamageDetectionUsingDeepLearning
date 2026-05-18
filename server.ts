import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Routes
  app.post("/api/analyze", async (req, res) => {
    const { image } = req.body;
    
    // Simulate complex AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulated result logic
    // In a real app, this would call a Python microservice or run YOLO via child_process
    const damageLevel = Math.floor(Math.random() * 40) + 55; // 55-95%
    const detections = [
      { type: "pothole", confidence: 0.92, bbox: [120, 150, 80, 60] },
      { type: "crack", confidence: 0.88, bbox: [300, 200, 150, 20] },
      { type: "pothole", confidence: 0.75, bbox: [450, 350, 100, 90] }
    ];

    res.json({
      status: "success",
      damageLevel,
      detections,
      model: "YOLOv8 + Hybrid CNN",
      timestamp: new Date().toISOString()
    });
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", system: "RoadGuard AI" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
