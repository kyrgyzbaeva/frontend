const bcrypt = require('bcryptjs');

// Функция хэширования пароля
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Функция проверки пароля
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Использование:
const hashedPassword = await hashPassword(req.body.password);
const isPasswordValid = await comparePassword(req.body.password, user.password);

const jwt = require('jsonwebtoken');

// Секретный ключ
const SECRET_KEY = 'amina';

// Функция генерации токена
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};
