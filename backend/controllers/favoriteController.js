const favoriteService = require('../services/favoriteService');

const favoriteController = {
  // Получение всех избранных записей
  getAllFavorites: async (req, res) => {
    try {
      const favorites = await favoriteService.getAllFavorites();
      res.status(200).json(favorites);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении избранного', error });
    }
  },

  // Добавление записи в избранное
  addFavorite: async (req, res) => {
    try {
      const { user_id, post_id } = req.body;
      const newFavorite = await favoriteService.addFavorite({ user_id, post_id });
      res.status(201).json(newFavorite);
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при добавлении в избранное', error });
    }
  },

  // Удаление записи из избранного
  removeFavorite: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await favoriteService.removeFavorite(id);
      if (!result) {
        res.status(404).json({ message: 'Запись не найдена' });
      } else {
        res.status(200).json({ message: 'Запись успешно удалена' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении из избранного', error });
    }
  },
};

module.exports = favoriteController;
