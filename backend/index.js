const express = require('express');
const cors = require('cors');  // <-- import cors
require('dotenv').config();
const sequelize = require('./src/config/db');
const Expense = require('./src/models/expense');
const expenseRoutes = require('./src/routes/expenseRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));  // <-- enable CORS for frontend
app.use(express.json());

// Mount expense routes
app.use('/api/expenses', expenseRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// DB connection and start server only after syncing
sequelize.authenticate()
  .then(() => {
    console.log('✅ Connected to MySQL DB');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Models synced');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection error:', err);
  });
