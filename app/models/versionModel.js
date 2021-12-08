module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {	
        userId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
            field: 'user_id',
			primaryKey: true
        },
        username: {
			type: Sequelize.STRING
        },
        name: {
			type: Sequelize.STRING
        },
        email: {
			type: Sequelize.STRING
        },
        password: {
			type: Sequelize.STRING
        },
        bisnisType: {
            field: 'bisnis_type',
			type: Sequelize.STRING
        },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE
        }
	},
    {
        freezeTableName: true,
    });
	return User;
}