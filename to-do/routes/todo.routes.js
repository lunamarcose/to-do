const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/:folderId', todoController.getTodos);
router.post('/', todoController.postTodo);
router.put('/:todoId', todoController.putUpdateTodo);
router.put('/updateStatus/:todoId', todoController.putUpdateTodoStatus);
router.get('/:todoId', todoController.getTodo);
router.delete('/:todoId', todoController.deleteTodo);

module.exports = router;
