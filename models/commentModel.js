const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  Code: { type: Number, default: 0},
  Recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipeMaster', required: true },
  User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  Likes: {type: Number , default: 0},
  Descriptions: { type: String, default: ""},
}, { timestamps: true });

module.exports = mongoose.model('RecipeComment', CommentSchema);
