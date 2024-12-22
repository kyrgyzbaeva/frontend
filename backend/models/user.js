'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      profile_image: { type: DataTypes.STRING },
      // Поле для хранения токена сброса пароля
      passwordResetToken: { type: DataTypes.STRING, allowNull: true },
      // Поле для хранения времени истечения токена
      passwordResetExpires: { type: DataTypes.DATE, allowNull: true },
    },
    {
      timestamps: true,
      tableName: 'users',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Post, { foreignKey: 'user_id' });
    User.hasMany(models.Favorite, { foreignKey: 'user_id' });
  };

  return User;
};
