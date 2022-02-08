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
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			unique: true,
			allowNull: false
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