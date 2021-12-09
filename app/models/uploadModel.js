module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define("file", {
        id: {
            type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
        },
        type: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE
        }
    },
    {
        freezeTableName: true,
    });
    return File;
};
  