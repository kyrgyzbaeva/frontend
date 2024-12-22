const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');
const upload = require('../middlewares/uploadMiddleware');

// Получение всех постов
router.get('/all', authenticateToken, postController.getAllPosts);

// Создание поста
router.post('/create', authenticateToken, postController.createPost);

// Обновление поста
router.put('/update/:id', authenticateToken, postController.updatePost);

// Удаление поста
router.delete('/delete/:id', authenticateToken, postController.deletePost);

// Загрузка изображений для поста
router.post(
  '/upload/:id', // ID поста
  authenticateToken,
  upload.array('images', 5),
  postController.uploadImages
);

// Удаление изображения из поста
router.delete(
  '/delete-image/:postId/:imageName',
  authenticateToken,
  postController.deleteImage
);

module.exports = router;
