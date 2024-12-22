const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаём подключение Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Имя базы данных
  process.env.DB_USER,       // Имя пользователя
  process.env.DB_PASSWORD,   // Пароль
  {
    host: process.env.DB_HOST, // Хост из .env
    port: process.env.DB_PORT, // Порт
    dialect: 'postgres',       // СУБД
  }
);

// Функция сброса базы данных
const resetDatabase = async () => {
  try {
    console.log('Подключение к базе данных...');
    await sequelize.authenticate(); // Проверка подключения
    console.log('Соединение успешно установлено.');

    // Полный сброс базы данных
    await sequelize.sync({ force: true });
    console.log('База данных успешно пересоздана!');
  } catch (error) {
    console.error('Ошибка при сбросе базы данных:', error);
  }
};

module.exports = { sequelize, resetDatabase };