const model_name = "Todo"
const table_name = "todos_table"
const opts = {
	underscored: true,
	timestamps: false,
	tableName: table_name
}


module.exports = (sequelize, Sequelize) => {
	const model = sequelize.define(model_name, {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			autoIncrement: true
		},
		user_id: {
			type: Sequelize.STRING
		},
		title: {
			type: Sequelize.STRING
		},
		is_done: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW
		}
	}, opts)

	return model
}