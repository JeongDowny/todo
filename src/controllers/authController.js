import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Todo from '../models/todo.js';

dotenv.config();

const login = (req, res) => {
  try {
    const { username, password } = req.body;

    if (username !== 'testuser' || password !== 'password123') {
      return res.status(401).json({ message: '로그인 실패' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
    res.status(200).json({ message: '로그인 성공', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '로그인 실패', error: error.message });
  }
};

const signup = async (req, res) => {
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

export default login;
