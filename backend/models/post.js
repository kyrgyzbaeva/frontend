'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }

  Post.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.STRING, allowNull: false },
      images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
      user_id: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
      timestamps: true
    }
  );

  return Post;
};
