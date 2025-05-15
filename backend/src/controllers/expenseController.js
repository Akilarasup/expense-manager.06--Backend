const Expense = require("../models/expense");
const { Op } = require("sequelize");

exports.createExpense = async (req, res, next) => {
  try {
    const { type, date, mode, amount, notes } = req.body;
    const newExpense = await Expense.create({ type, date, mode, amount, notes });
    res.status(201).json(newExpense);
  } catch (err) {
    next(err);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const filter = req.query.filter || "Monthly";
    let where = {};

    // Build date filter
    const today = new Date();
    if (filter === "Weekly") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      where.date = { [Op.gte]: weekAgo };
    } else if (filter === "Monthly") {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      where.date = { [Op.gte]: monthAgo };
    } else if (filter === "Yearly") {
      const yearAgo = new Date();
      yearAgo.setFullYear(today.getFullYear() - 1);
      where.date = { [Op.gte]: yearAgo };
    }

    const expenses = await Expense.findAll({ where, order: [["date", "DESC"]] });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
};
