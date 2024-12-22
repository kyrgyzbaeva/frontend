const { Favorite } = require('../models');

const favoriteService = {
  // Получение всех избранных записей
  getAllFavorites: async () => {
    return await Favorite.findAll();
  },

  // Добавление записи в избранное
  addFavorite: async (data) => {
    return await Favorite.create(data);
  },

  // Удаление записи из избранного
  removeFavorite: async (id) => {
    return await Favorite.destroy({ where: { id } });
  },
};

module.exports = favoriteService;
