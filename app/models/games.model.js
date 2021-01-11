const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "games",
    {
      id: {
        type: DataTypes.CHAR,
        allowNull: false,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("NOW()"),
      },
    },
    { freezeTableName: true, timestamps: true }
  );
};
