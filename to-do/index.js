const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const initSequelize = require(path.join(__dirname, '/util/sequelize-init'));
const port = process.env.PORT || 5000;

// Import routes
const todosRoutes = require('./routes/todo.routes');
const foldersRoutes = require('./routes/folder.routes');

app.use(express.json()); // application-json
app.use(cors());

// Serve static content - build
app.use(express.static(path.join(__dirname, '/client/dist/to-do-frontend/')));
app.use(
	express.static(
		path.join(__dirname + '/folders', '/client/dist/to-do-frontend/')
	)
);

// Routes
app.use('/api/todos', todosRoutes);
app.use('/api/folders', foldersRoutes);
app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.validationData;
	res.status(status).json({ message: message, data: data });
});

// Init sequelize sync and start server. Use true to force sync
const forceSync = false;
initSequelize(forceSync)
	.then((result) => {
		app.listen(port, () => {
			console.log('App is running on: ' + 'http://localhost:' + port);
		});
	})
	.catch((err) => {
		console.log(err);
	});
