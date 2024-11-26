const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  RecipeName: { type: String, required: true },
  RecipeDescription: { type: String, default: '' },
  Category: [String],
  IsSaved: { type: Boolean, default: false },
  NumOfSaved: { type: Number, default: 0 },
  Author: { type: String, default: "" },
  Ingredients: [
    {
      quantity: { type: String, required: true },
      unit: { type: String, default: '' },
      description: { type: String, required: true },
      detailedSize: { type: Boolean, default: false }
    }
  ],
  PreparationTime: { type: Number, default: 0 },
  CookingTime: { type: String, required: true },
  Thumbnail: { type: String, default: '' },
  template: { type: String, required: true },
  servings: { type: String, required: true }
});

const RecipeMaster = mongoose.model('RecipeMaster', recipeSchema);

module.exports = RecipeMaster;
