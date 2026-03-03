const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const SQLiteStore = require("connect-sqlite3")(session);

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new SQLiteStore({ db: "sessions.db", dir: path.join(__dirname, "database") }),
    secret: "super_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 },
  })
);

// Serve frontend build if needed
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Handle client-side routing for React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});