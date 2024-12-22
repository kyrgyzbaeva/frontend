module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    'Favorite',
    {
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      post_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'Favorites',
      timestamps: true
    }
  );

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    Favorite.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'CASCADE' });
  };

  return Favorite;
};
