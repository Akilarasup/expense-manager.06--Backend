const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

// POST /api/expenses - Add a new expense
router.post('/', async (req, res) => {
  try {
    const { type, date, mode, amount, notes } = req.body;

    const newExpense = await Expense.create({
      type,
      date,
      mode,
      amount,
      notes
    });

    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// GET /api/expenses - Fetch all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.findAll({ order: [['date', 'DESC']] });
    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

module.exports = router;
