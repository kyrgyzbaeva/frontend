const userService = require('../services/userService');

const userController = {
  // Получение всех пользователей
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении пользователей', error });
    }
  },

  // Создание нового пользователя
  createUser: async (req, res) => {
    try {
      const { username, email, password, profile_image } = req.body;
      const newUser = await userService.createUser({ username, email, password, profile_image });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Ошибка при создании пользователя', error });
    }
  },

  // Получение пользователя по ID
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (!user) {
        res.status(404).json({ message: 'Пользователь не найден' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении пользователя', error });
    }
  },
};

module.exports = userController;
