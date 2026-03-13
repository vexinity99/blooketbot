import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (index.html, script.js, css, etc)
app.use(express.static(__dirname));

// Root page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// join endpoint (used by script.js)
app.post("/join", async (req, res) => {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.json({
        success: false,
        msg: "Missing game ID or name"
      });
    }

    // Fake token system (same behavior most bot repos use)
    const fbToken = "fake-token-" + Math.random().toString(36).slice(2);
    const fbShardURL = "https://blooket-2020.firebaseio.com";

    res.json({
      success: true,
      fbToken,
      fbShardURL
    });

  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      msg: "Server error"
    });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
