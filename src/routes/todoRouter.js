import express from 'express';
import {
  createTodo,
  getAllTodos,
  getTodoById,
  delAllTodos,
  delTodoById,
  updateTodo,
} from '../controllers/todoController.js';
// import checkJWT from '../middlewares/authMiddleware.js';

const todoRouter = express.Router();

//todoRouter.use('/', checkJWT);

todoRouter.post('/', createTodo);

todoRouter.get('/', getAllTodos);

todoRouter.get('/:id', getTodoById);

todoRouter.delete('/', delAllTodos);

todoRouter.delete('/:id', delTodoById);

todoRouter.patch('/:id', updateTodo);

export default todoRouter;
