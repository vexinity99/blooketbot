import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // serve index.html & script.js

// Example join endpoint
app.put("/join", async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ success: false, msg: "Missing id or name" });
    }

    // Forward request to Blooket's Firebase join endpoint
    const fbRes = await fetch(`https://fb.blooket.com/c/firebase/join`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://goldquest.blooket.com"
      },
      body: JSON.stringify({ id, name })
    });

    const data = await fbRes.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
