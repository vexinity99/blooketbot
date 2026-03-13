const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/join", async (req, res) => {
  const { id, name } = req.body;

  try {
    const r = await fetch("https://fb.blooket.com/c/firebase/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        name: name
      })
    });

    const data = await r.json();
    res.json(data);

  } catch (e) {

    res.json({
      success: false,
      msg: "Join request failed"
    });

  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
