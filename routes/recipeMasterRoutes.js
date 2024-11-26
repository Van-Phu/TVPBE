const express = require('express');
const router = express.Router();
const recipeMasterController = require('../controllers/recipeMasterController')
router.get('/getAllRecipes', recipeMasterController.getAllRecipes);
router.get('/getSavedRecipes/:id', recipeMasterController.getSavedRecipes);
router.get('/getRecipesByAuthor/:username', recipeMasterController.getRecipesByAuthor);
router.post('/createRecipe', recipeMasterController.createRecipe);
router.post('/getRecipeById', recipeMasterController.getRecipeById);
router.post('/saveRecipe', recipeMasterController.saveRecipe);
router.put('/updateRecipe/:id', recipeMasterController.updateRecipe);
router.delete('/deleteRecipe/:id', recipeMasterController.deleteRecipe);
router.delete('/deleteMultipleRecipes', recipeMasterController.deleteMultipleRecipes);
router.post('/unSaveRecipe', recipeMasterController.unSaveRecipe);



module.exports = router;
