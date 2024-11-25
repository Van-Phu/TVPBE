const mongoose = require('mongoose');

const RecipeMasterSchema = new mongoose.Schema({
  Code: { type: Number, default: 0 },
  RecipeName: { type: String, required: true },
  RecipeDescription: { type: String },
  Category: { type: [String], default: [""] },
  IsSaved: { type: Boolean, default: false },
  NumOfSaved: { type: Number, default: 0 },
  Author: { type: String },
  Ingredients: { type: [String], default: [] },
  PreparationTime: { type: Number, default: 0 },
  CookingTime: { type: Number, default: 0 },
  Thumnail: { type: String },
  template: { type: String },
  servings: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('RecipeMaster', RecipeMasterSchema);
