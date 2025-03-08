import mongoose from 'mongoose';
import Todo from '../models/todo.js';

export const createTodo = async (req, res) => {
  try {
    const { task, category, priority, dueDate } = req.body;
    const newTodo = new Todo({
      task: task,
      category: category,
      priority: priority,
      dueDate: dueDate,
    });
    await newTodo.save();
    res.status(201).json({ message: '투두 생성 성공', todo: newTodo });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: '투두 생성 실패', error: error.errors.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();
    res.status(200).json({ message: '투두 조회 성공', allTodos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투두 조회 실패', error });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: '올바르지 않은 id 형식' });
      return;
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: '투두를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '투두 조회 성공', todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투두 조회 실패', error });
  }
};

export const delAllTodos = async (req, res) => {
  try {
    const result = await Todo.deleteMany();
    res
      .status(200)
      .json({
        message: `모든 투두 삭제 성공, 삭제된 투두 수: ${result.deletedCount}`,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투두 삭제 실패', error });
  }
};

export const delTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: '올바르지 않은 id 형식' });
      return;
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: '투두를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '투두 삭제 성공', deletedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투두 삭제 실패', error });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, category, priority, dueDate, completed } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: '올바르지 않은 id 형식' });
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, category, priority, dueDate, completed },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: '투두를 찾을 수 없습니다.' });
    }

    res.status(200).json({ message: '투두 변경 성공', updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '투두 변경 실패', error });
  }
};
