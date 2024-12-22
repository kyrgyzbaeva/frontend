const { User } = require('../models');

const userService = {
  // Получение всех пользователей
  getAllUsers: async () => {
    return await User.findAll();
  },

  // Создание нового пользователя
  createUser: async (data) => {
    return await User.create(data);
  },

  // Получение пользователя по ID
  getUserById: async (id) => {
    return await User.findByPk(id);
  },
};

module.exports = userService;
