const postService = require('../services/postService');
const fs = require('fs');
const path = require('path');

const postController = {
  // Получение всех постов
  getAllPosts: async (req, res) => {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении постов', error });
    }
  },

  // Создание поста
  createPost: async (req, res) => {
    try {
      const { title, content, status, images } = req.body;
      const user_id = req.user.id; // Берем ID пользователя из токена

      const newPost = await postService.createPost({
        title,
        content,
        status,
        images,
        user_id,
      });

      res.status(201).json({
        message: 'Пост успешно создан',
        post: newPost, // Здесь уже будет имя пользователя
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при создании поста', error });
    }
  },

  // Обновление поста
  updatePost: async (req, res) => {
    try {
      const { id } = req.params; // ID поста
      const { title, content, status, images } = req.body; // Новые данные для поста

      const user_id = req.user.id; // ID пользователя из токена

      // Обновляем пост через сервис
      const updatedPost = await postService.updatePost(
        id,
        { title, content, status, images },
        user_id // Передаём ID текущего пользователя для проверки прав
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Пост не найден' });
      }

      res.status(200).json({
        message: 'Пост успешно обновлён',
        post: updatedPost,
      });
    } catch (error) {
      if (error.message === 'У вас нет прав для редактирования этого поста') {
        return res.status(403).json({ message: error.message });
      }
      res.status(500).json({ message: 'Ошибка при обновлении поста', error });
    }
  },
  

  // Удаление поста
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id; // ID пользователя из токена
  
      // Ищем пост
      const post = await postService.getPostById(id);
  
      // Проверяем, существует ли пост и принадлежит ли он текущему пользователю
      if (!post) {
        return res.status(404).json({ message: 'Пост не найден' });
      }
      if (post.user_id !== user_id) {
        return res.status(403).json({ message: 'У вас нет прав для удаления этого поста' });
      }
  
      // Удаляем пост
      await postService.deletePost(id);
      res.status(200).json({ message: 'Пост успешно удалён' });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении поста', error });
    }
  },

  // Загрузка изображений
  uploadImages: async (req, res) => {
    try {
      const { id: postId } = req.params; // ID поста из параметров
      const userId = req.user.id; // ID текущего пользователя из токена

      // Найти пост
      const post = await postService.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Пост не найден' });
      }

      // Проверяем, принадлежит ли пост текущему пользователю
      if (post.user_id !== userId) {
        return res.status(403).json({ message: 'У вас нет прав для загрузки изображений в этот пост' });
      }

      // Проверка: есть ли загруженные файлы
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Файлы не загружены' });
      }

      // Сохраняем пути новых файлов
      const uploadedImages = req.files.map((file) => `uploads/${file.filename}`);
      post.images = [...post.images, ...uploadedImages];
      await post.save();

      res.status(200).json({ message: 'Изображения успешно загружены', images: post.images });
    } catch (error) {
      console.error(error); // Логируем ошибку для диагностики
      res.status(500).json({ message: 'Ошибка при загрузке изображений', error });
    }
  },

  // Удаление изображения
  deleteImage: async (req, res) => {
    try {
      const { postId, imageName } = req.params;
      const user_id = req.user.id; // ID пользователя из токена

      // Проверяем права доступа
      const post = await postService.getPostById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Пост не найден' });
      }
      if (post.user_id !== user_id) {
        return res.status(403).json({ message: 'У вас нет прав для удаления изображений этого поста' });
      }

      // Удаление пути изображения из базы данных
      const updatedPost = await postService.removeImage(postId, imageName);

      // Удаление файла с сервера
      const filePath = path.join(__dirname, '../', imageName);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Ошибка при удалении файла:', err);
        }
      });

      res.status(200).json({
        message: 'Изображение успешно удалено',
        post: updatedPost,
      });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении изображения', error });
    }
  },
  
};

module.exports = postController;
