module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('version', {	
        id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
        },
        androidMerchantVersion: {
			type: Sequelize.STRING
        },
        androidUserVersion: {
			type: Sequelize.STRING
        },
        iosMerchantVersion: {
			type: Sequelize.STRING
        },
        iosUserVersion: {
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