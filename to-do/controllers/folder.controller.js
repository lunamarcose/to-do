const Folder = require('../models/folder');
const Todo = require('../models/todo');

exports.getFolders = (req, res, next) => {
	Folder.findAll()
		.then((folders) => {
			res.status(200).json(folders);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getFolder = (req, res, next) => {
	const idFolder = req.params.folderId;
	Folder.findByPk(idFolder)
		.then((folders) => {
			res.status(200).json(folders);
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.postFolder = (req, res, next) => {
	const title = req.body.title;
	Folder.create({ title: title })
		.then((folder) => {
			res.status(201).json({ folder: folder });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteFolder = async (req, res, next) => {
	console.log(req.params);
	const idFolder = req.params.folderId;
	try {
		const folder = await Folder.findByPk(idFolder);
		if (folder) {
			const idFolder = folder.id;
			const todos = await Todo.findAll({
				where: {
					folderId: idFolder,
				},
			});
			for (let i = 0; i < todos.length; i++) {
				await todos[i].destroy();
			}
			folder.destroy();
		}
		res.status(200).json();
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
