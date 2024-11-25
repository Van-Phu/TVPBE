const RecipeMaster = require('../models/recipeModel');
const User = require('../models/userModel');

// Lấy danh sách tất cả Recipe
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeMaster.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo Recipe mới
exports.createRecipe = async (req, res) => {
  const { RecipeName, RecipeDescription, Ingredients, Author, ...otherFields } = req.body;

  try {
    const newRecipe = new RecipeMaster({
      RecipeName,
      RecipeDescription,
      Ingredients,
      Author: Author, 
      ...otherFields,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Công thức đã được tạo thành công', newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

// Lấy Recipe theo ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await RecipeMaster.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe không tồn tại." });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật Recipe
exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await RecipeMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe không tồn tại." });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa Recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await RecipeMaster.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe không tồn tại." });
    res.status(200).json({ message: "Recipe đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa nhiều Recipe
exports.deleteMultipleRecipes = async (req, res) => {
    try {
      const { ids } = req.body; // Lấy danh sách ID từ body request
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Danh sách IDs không hợp lệ." });
      }
  
      // Xóa tất cả các bản ghi có _id thuộc danh sách ids
      const result = await RecipeMaster.deleteMany({ _id: { $in: ids } });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Không có Recipe nào được tìm thấy để xóa." });
      }
  
      res.status(200).json({
        message: `${result.deletedCount} Recipe(s) đã được xóa thành công.`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
