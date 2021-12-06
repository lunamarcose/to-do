const Todo = require('../models/todo');
const Folder = require('../models/folder');

exports.getTodos = (req, res, next) => {
	const idFolder = req.params.folderId;
	Folder.findByPk(idFolder)
		.then((folder) => {
			return Todo.findAll({
				where: {
					folderId: idFolder,
				},
			});
		})
		.then((todos) => {
			res.status(200).json(todos);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getTodo = (req, res, next) => {
	const idTodo = req.params.todoId;
	Todo.findByPk(idTodo)
		.then((todos) => {
			res.status(200).json(todos);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.postTodo = (req, res, next) => {
	const title = req.body.title;
	const completed = req.body.completed;
	const idFolder = req.body.folderId;
	Folder.findByPk(idFolder)
		.then((folder) => {
			return Todo.create({
				title: title,
				completed: completed,
				folderId: idFolder,
			});
		})
		.then((todo) => {
			res.status(201).json({ todo: todo });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.putUpdateTodo = (req, res, next) => {
	const idTodo = req.params.todoId;
	const title = req.body.title;
	Todo.findByPk(idTodo)
		.then((todo) => {
			todo.title = title;
			return todo.save();
		})
		.then((todo) => {
			res.status(200).json({ todo: todo });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.putUpdateTodoStatus = (req, res, next) => {
	const idTodo = req.params.todoId;
	Todo.findByPk(idTodo)
		.then((todo) => {
			todo.completed = !todo.completed;
			return todo.save();
		})
		.then((todo) => {
			res.status(200).json({ todo: todo });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteTodo = (req, res, next) => {
	const idTodo = req.params.todoId;
	Todo.findByPk(idTodo)
		.then((todo) => {
			return todo.destroy();
		})
		.then((todo) => {
			res.status(200).json();
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
