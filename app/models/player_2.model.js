const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "player_2",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
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
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["game_id"],
        },
      ],
      timestamps: true,
    }
  );
};
