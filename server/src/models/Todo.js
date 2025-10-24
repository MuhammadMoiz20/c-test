const { Schema, model } = require('mongoose');

const TodoSchema = new Schema(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = model('Todo', TodoSchema);
