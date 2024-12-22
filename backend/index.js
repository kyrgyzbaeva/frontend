require('dotenv').config(); // Подключаем .env файл
const express = require('express');
const bodyParser = require('body-parser');
const { resetDatabase } = require('./db'); // Импорт функции сброса базы данных

const app = express(); // Создаём экземпляр Express
const port = process.env.PORT || 3000;

// Настройка bodyParser
app.use(bodyParser.json());

// Корневой маршрут для проверки
app.get('/', (req, res) => {
  res.send('Hello, Server is working!');
});

// Подключение маршрутов
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Запуск сервера с ожиданием готовности БД
resetDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Ошибка при запуске сервера:', error);
  });