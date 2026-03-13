// server.js
import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase } from "firebase/database";

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(express.json());

// Firebase keys (from your original snippet)
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCA-cTOnX19f6LFnDVVsHXya3k6ByP_MnU",
  authDomain: "blooket-2020.firebaseapp.com",
  projectId: "blooket-2020",
  storageBucket: "blooket-2020.appspot.com",
  messagingSenderId: "741533559105",
  appId: "1:741533559105:web:b8cbb10e6123f2913519c0",
  measurementId: "G-S3H5NGN10Z",
};

// Mock list of Firebase shards (example URLs, replace with real ones if needed)
const SHARD_URLS = [
  "https://blooket-2020.firebaseio.com",
  "https://blooket-2020-2.firebaseio.com",
  "https://blooket-2020-3.firebaseio.com",
];

// Utility to pick a shard based on game ID
function getShardURL(gid) {
  const index = parseInt(gid) % SHARD_URLS.length;
  return SHARD_URLS[index];
}

// /join endpoint
app.post("/join", async (req, res) => {
  try {
    const { id: gid, name } = req.body;
    if (!gid || !name) {
      return res.status(400).json({ success: false, msg: "Missing gid or name" });
    }

    const fbShardURL = getShardURL(gid);

    // Initialize Firebase app (for token generation)
    const liveApp = initializeApp({ ...FIREBASE_CONFIG, databaseURL: fbShardURL }, Date.now().toString());
    const auth = getAuth(liveApp);

    // Sign in anonymously (you can replace with custom token logic if needed)
    await signInAnonymously(auth);

    // For simplicity, generate a fake token (replace with real token fetch if you have it)
    const fbToken = "FAKE_FBTOKEN_" + gid;

    return res.json({
      success: true,
      fbToken,
      fbShardURL,
      msg: "Joined successfully",
    });
  } catch (err) {
    console.error("Join error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
