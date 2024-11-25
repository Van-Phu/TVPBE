const express = require('express');
const router = express.Router();
const recipeMasterController = require('../controllers/recipeMasterController');

router.get('/', recipeMasterController.getAllRecipes);
router.post('/', recipeMasterController.createRecipe);
router.get('/:id', recipeMasterController.getRecipeById);
router.put('/:id', recipeMasterController.updateRecipe);
router.delete('/:id', recipeMasterController.deleteRecipe);
router.delete('/', recipeMasterController.deleteMultipleRecipes);


module.exports = router;
