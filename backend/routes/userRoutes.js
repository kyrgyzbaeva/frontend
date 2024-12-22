const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

// Новый маршрут для GET /users
router.get('/', (req, res) => {
  res.json({ message: 'Users endpoint is working!' });
});

// Существующие маршруты
router.get('/all', authenticateToken, userController.getAllUsers);
router.post('/create', authenticateToken, userController.createUser);
router.get('/:id', authenticateToken, userController.getUserById);

module.exports = router;