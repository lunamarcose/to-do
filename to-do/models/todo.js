const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Todo = sequelize.define('todo', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
});

module.exports = Todo;
