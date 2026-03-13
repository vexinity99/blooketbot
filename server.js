import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.put("/join", (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.json({ success: false, msg: "Missing game ID or name" });
    }

    // Fake Firebase info (works with your original connect() logic)
    const fbToken = "FAKE_FB_TOKEN_123456789";
    const fbShardURL = "https://blooket-firebase-shard.firebaseio.com";

    return res.json({
      success: true,
      fbToken,
      fbShardURL,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
