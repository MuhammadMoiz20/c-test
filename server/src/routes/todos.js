const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// GET /api/todos - list all
router.get('/', async (req, res, next) => {
  try {
    const items = await Todo.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
});

// POST /api/todos - create
router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }
    const created = await Todo.create({ text: text.trim() });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/todos/:id - delete by id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
