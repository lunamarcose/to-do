const Sequelize = require('sequelize');
const sequelize = require('../util/db');

const Folder = sequelize.define('folder', {
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
});

module.exports = Folder;
