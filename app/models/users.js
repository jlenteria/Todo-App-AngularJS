const model_name = "User"
const table_name = "users_table"
const opts = {
	underscored: true,
	timestamps: false,
	tableName: table_name
}

module.exports = (sequelize, Sequelize) => {
	const model = sequelize.define(model_name, {
		id: {
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			allowNull: false,
			unique: true
		},
		name: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING,
			unique: true
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW
		}

	}, opts)

	return model
}