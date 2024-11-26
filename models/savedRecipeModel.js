const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
  Code: { type: Number, default: 0},
  Recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipeMaster', required: true },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const SavedRecipe = mongoose.model('SavedRecipe', SavedRecipeSchema);
module.exports = SavedRecipe;

