import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  /* userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }, */
  task: { type: String, required: true },
  category: {
    type: String,
    enum: ['theme-study', 'theme-exercise', 'theme-chore'],
    required: true,
    default: 'theme-chore',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: false,
    default: 'medium',
  },
  dueDate: { type: Date, required: false },
  completed: { type: Boolean, required: false, default: false },
});

export default mongoose.model('Todo', todoSchema);
