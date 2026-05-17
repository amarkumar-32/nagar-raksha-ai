const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("CrowdRakshak Backend Running 🚀");
});

app.get("/crowd", (req, res) => {
  const people = Math.floor(Math.random() * 500);

  let risk = "Low";
  let prediction = "Stable";

  if (people > 400) {
    risk = "High";
    prediction = "Dangerous Spike";
  } else if (people > 200) {
    risk = "Medium";
    prediction = "Crowd Increasing";
  }

  res.json({
    people,
    risk,
    alerts: Math.floor(Math.random() * 20),
    prediction,
    time: new Date().toLocaleTimeString(),
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});