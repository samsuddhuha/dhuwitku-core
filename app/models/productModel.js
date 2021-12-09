module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {	
        userId: {
			type: Sequelize.INTEGER,
            field: 'user_id',
        },
        id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
            field: 'id',
			primaryKey: true
        },
        name: {
			type: Sequelize.STRING
        },
        description: {
			type: Sequelize.STRING
        },
        image: {
			type: Sequelize.STRING
        },
        price: {
			type: Sequelize.INTEGER
        },
        purchasePrice: {
            field: 'purchase_price',
			type: Sequelize.INTEGER
        },
        stock: {
			type: Sequelize.INTEGER
        },
        active: {
			type: Sequelize.BOOLEAN
        },
        sold: {
			type: Sequelize.INTEGER
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
	return Product;
}