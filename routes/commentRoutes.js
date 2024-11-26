const express = require('express');
const router = express.Router();
const recipeCommentController = require('../controllers/recipeCommentController');

router.get('/getAllComments/:id', recipeCommentController.getAllComments);
router.post('/addComment/', recipeCommentController.addComment);
router.put('/updateComment/:id', recipeCommentController.updateComment);
router.delete('/deleteComment/:id', recipeCommentController.deleteComment);


module.exports = router;
