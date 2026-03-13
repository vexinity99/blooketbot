import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* serve website files */
app.use(express.static(__dirname));

/* homepage */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* join proxy */
app.post("/join", async (req, res) => {
  try {
    const { id, name } = req.body;

    const response = await fetch("https://play.blooket.com/api/playersessions/solo", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        gameId: id,
        name: name
      })
    });

    const data = await response.json();
    res.json(data);

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
