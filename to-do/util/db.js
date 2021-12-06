const Sequelize = require('sequelize');

let sequelize;
const db_name = 'todo';
const db_user = 'postgres';
const db_port = '5432';
const db_pass = '2412';

if (process.env.NODE_ENV === 'production') {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		protocol: 'postgres',
		define: {
			//prevent sequelize from pluralizing table names
			freezeTableName: true,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	});
} else {
	sequelize = new Sequelize(db_name, db_user, db_pass, {
		dialect: 'postgres',
		host: 'localhost',
		port: db_port,
		define: {
			//prevent sequelize from pluralizing table names
			freezeTableName: true,
		},
	});
}

module.exports = sequelize;
