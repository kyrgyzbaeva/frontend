const express = require('express');
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

router.get('/all', favoriteController.getAllFavorites);
router.post('/create', favoriteController.addFavorite);
router.delete('/:id', favoriteController.removeFavorite);

module.exports = router;
