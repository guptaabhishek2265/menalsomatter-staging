const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Serve static files if needed
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());

// Fake in-memory ticket store
let userTickets = {};

// 👋 Basic root route
app.get("/", async (req, res) => {
  return res.json({ message: "Hello from backend" });
});

// ✅ Get current raffle ticket count
app.get("/api/raffle-status", (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  const tickets = userTickets[userId] || 0;
  res.json({ tickets });
});

// ✅ Add a raffle ticket
app.post("/api/raffle-entry", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, error: "User ID missing" });
  }

  userTickets[userId] = (userTickets[userId] || 0) + 1;
  return res.json({ success: true, tickets: userTickets[userId] });
});

// 🔥 Stripe routes are disabled
// app.post("/create-checkout-session", async (req, res) => { ... });
// app.post("/webhook", ...)

app.listen(3000, () =>
  console.log("🚀 Backend server running at http://localhost:3000")
);
