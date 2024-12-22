const { Post, User } = require('../models');

const postService = {
  // Получение всех постов
  getAllPosts: async () => {
    try {
      return await Post.findAll({
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username'],
          },
        ],
      });
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
      throw error;
    }
  },

  // Создание поста
  createPost: async (postData) => {
    const newPost = await Post.create(postData);
    return await Post.findByPk(newPost.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
      ],
    });
  },

  // Получение поста по ID
  getPostById: async (id) => {
    try {
      return await Post.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'username'],
          },
        ],
      });
    } catch (error) {
      console.error('Ошибка при получении поста по ID:', error);
      throw error;
    }
  },

  // Обновление поста
  updatePost: async (id, updatedData, user_id) => {
    const post = await Post.findByPk(id);

    if (!post) {
      return null; // Пост не найден
    }

    if (post.user_id !== user_id) {
      throw new Error('У вас нет прав для редактирования этого поста'); // Проверка на владельца
    }

    await post.update(updatedData);
    
    return await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user', // Имя ассоциации
          attributes: ['id', 'username'], 
        },
      ],
    });
  },

  // Удаление поста
  deletePost: async (id) => {
    try {
      const post = await Post.findByPk(id);
      if (!post) return null;

      await post.destroy();
      return true;
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
      throw error;
    }
  },

  // Добавление изображений
  addImages: async (postId, imagePaths) => {
    const post = await Post.findByPk(postId);
    if (!post) return null;

    const existingImages = post.images || [];
    const updatedImages = [...existingImages, ...imagePaths];

    await post.update({ images: updatedImages });
    return post;
  },

  // Удаление изображения
  removeImage: async (postId, imageName) => {
    const post = await Post.findByPk(postId);
    if (!post) return null;

    const updatedImages = post.images.filter((image) => image !== imageName);

    await post.update({ images: updatedImages });
    return post;
  },
};

module.exports = postService;
