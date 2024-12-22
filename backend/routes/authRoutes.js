const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();
const { Op } = require('sequelize');


const nodemailer = require('nodemailer');
const crypto = require('crypto');

const SECRET_KEY = 'amina';

// Регистрация
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при регистрации', error });
  }
});

// Вход
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ message: 'Успешный вход', token });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе', error });
  }
});

// Генерация токена сброса пароля
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

    // Сохраняем токен в БД
    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = resetTokenExpires;
    await user.save();


    // Создание транспортера для Яндекс.Почты
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // smtp.yandex.ru
      port: process.env.EMAIL_PORT, // 465
      secure: true, // true для порта 465
      auth: {
        user: process.env.EMAIL, // ваш email (your_yandex_email@yandex.ru)
        pass: process.env.EMAIL_PASSWORD, // пароль приложения
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Сброс пароля',
      text: `Ваш токен для сброса пароля: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Ссылка для сброса пароля отправлена на ваш email' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при запросе сброса пароля', error });
  }
});

// Сброс пароля
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { [Op.gt]: new Date() }, // Токен еще не истек
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Неверный или истёкший токен' });
    }

    // Обновляем пароль
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = null; // Удаляем токен
    user.passwordResetExpires = null;
    await user.save();

    res.json({ message: 'Пароль успешно сброшен' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при сбросе пароля', error });
  }
});

module.exports = router;
