import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow cross-origin requests
app.use(bodyParser.json());

// Proxy endpoint to get the token
app.put("/join", async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ success: false, msg: "Missing id or name" });
  }

  try {
    const response = await fetch("https://fb.blooket.com/c/firebase/join", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://goldquest.blooket.com"
      },
      body: JSON.stringify({ id, name }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
