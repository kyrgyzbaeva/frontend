# Используем официальный образ Node.js
FROM node:16

# Создаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Открываем порт для приложения
EXPOSE 3000

# Запускаем приложение
CMD ["node", "index.js"]