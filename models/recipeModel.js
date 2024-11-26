const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  RecipeName: { type: String, required: true },
  RecipeDescription: { type: String, default: '' },
  Category: [String],
  IsSaved: { type: Boolean, default: false },
  NumOfSaved: { type: Number, default: 0 },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  Ingredients: [
    {
      quantity: { type: String, required: true },
      unit: { type: String, default: '' },
      description: { type: String, required: true },
      detailedSize: { type: Boolean, default: false }
    }
  ],
  PreparationTime: { type: Number, default: 0 },
  CookingTime: { type: Number, default: 0 },
  Thumbnail: { type: String },
  template: { type: String },
  servings: { type: Number, default: 0 },
  Comments: { type:[mongoose.Schema.Types.ObjectId], ref:'Comment'}
}, { timestamps: true });

const RecipeMaster = mongoose.model('RecipeMaster', recipeSchema);

module.exports = RecipeMaster;
