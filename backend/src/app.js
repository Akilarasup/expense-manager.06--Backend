const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // allow frontend
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Health check
app.get("/", (req, res) => res.send("Expense Manager API is running"));

// Error handler
app.use(errorHandler);

// Sync DB and start server
const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  .then(() => {
    console.log("🌐 Database synced");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ DB sync failed:", err);
  });
