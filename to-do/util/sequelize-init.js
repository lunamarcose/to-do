const path = require('path');
const sequelize = require(path.join(__dirname, '/db'));

// Import models
const Todo = require('../models/todo');
const Folder = require('../models/folder');

const initialize = function (forceSync) {
	// Relationships (Foreign Keys)
	// Folder - Todo
	Folder.hasMany(Todo);
	Todo.belongsTo(Folder);
	// Province.hasMany(City);

	// Test connection
	// try {
	// 	sequelize.authenticate();
	// 	console.log('Connection has been established successfully.');
	// } catch (error) {
	// 	console.error('Unable to connect to the database:', error);
	// }
	if (forceSync) {
		return sequelize.sync({ force: true });
	}
	return sequelize.sync();
};

module.exports = initialize;
