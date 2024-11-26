const express = require('express');
const router = express.Router();
const recipeCommentController = require('../controllers/recipeCommentController');

router.get('/:id', recipeCommentController.getAllComments);
router.post('/', recipeCommentController.addComment);
router.put('/:id', recipeCommentController.updateComment);
router.delete('/:id', recipeCommentController.deleteComment);


module.exports = router;
