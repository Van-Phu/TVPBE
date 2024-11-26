const express = require('express');
const router = express.Router();
const recipeMasterController = require('../controllers/recipeMasterController')
router.get('/getAllRecipes', recipeMasterController.getAllRecipes);
router.get('/getRecipesByAuthor/:username', recipeMasterController.getRecipesByAuthor);
router.post('/createRecipe', recipeMasterController.createRecipe);
router.get('/getRecipeById/:id', recipeMasterController.getRecipeById);
router.put('/updateRecipe/:id', recipeMasterController.updateRecipe);
router.delete('/deleteRecipe/:id', recipeMasterController.deleteRecipe);
router.delete('/deleteMultipleRecipes', recipeMasterController.deleteMultipleRecipes);


module.exports = router;
