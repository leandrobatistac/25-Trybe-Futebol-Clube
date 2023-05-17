module.exports = (sequelize, DataTypes) => {
  const TeamTable = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: DataTypes.STRING,
  }, {
    tableName: 'teams',
    underscored: true,
    timestamps: false,
  });
  return TeamTable;
};
