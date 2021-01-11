function applyExtraSetup(sequelize) {
  const { users, games, handsigns, player_1, player_2 } = sequelize.models;

  // Games
  games.belongsTo(users, { foreignKey: "winner" });

  // Player_1
  users.hasMany(player_1, {
    foreignKey: { name: "user_id", allowNull: false },
  });
  player_1.belongsTo(games, {
    foreignKey: { name: "game_id", allowNull: false },
  });
  handsigns.hasMany(player_1, {
    foreignKey: { name: "round_1", allowNull: true },
  });
  handsigns.hasMany(player_1, {
    foreignKey: { name: "round_2", allowNull: true },
  });
  handsigns.hasMany(player_1, {
    foreignKey: { name: "round_3", allowNull: true },
  });
  handsigns.hasMany(player_1, {
    foreignKey: { name: "round_4", allowNull: true },
  });
  handsigns.hasMany(player_1, {
    foreignKey: { name: "round_5", allowNull: true },
  });

  // Player_2
  users.hasMany(player_2, {
    foreignKey: { name: "user_id", allowNull: false },
  });
  player_2.belongsTo(games, {
    foreignKey: { name: "game_id", allowNull: false },
  });
  handsigns.hasMany(player_2, {
    foreignKey: { name: "round_1", allowNull: true },
  });
  handsigns.hasMany(player_2, {
    foreignKey: { name: "round_2", allowNull: true },
  });
  handsigns.hasMany(player_2, {
    foreignKey: { name: "round_3", allowNull: true },
  });
  handsigns.hasMany(player_2, {
    foreignKey: { name: "round_4", allowNull: true },
  });
  handsigns.hasMany(player_2, {
    foreignKey: { name: "round_5", allowNull: true },
  });
}

module.exports = { applyExtraSetup };
