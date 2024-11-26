const RecipeComment = require('../models/commentModel');

// Lấy danh sách tất cả Recipe
exports.getAllComments = async (req, res) => {
  try {
    console.log(req.params)
    const recipes = await RecipeComment.find({Recipe: req.params});
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Thêm mới comment vào Recipe
exports.addComment = async (req, res) => {
  const { Recipe, User, ...otherFields } = req.body;

  try {
    const newRecipe = new RecipeMaster({
        Recipe : Recipe,
        User: User,
      ...otherFields,
    });

    await newRecipe.save();
    res.status(201).json({ message: 'Thêm mới bình luận thành công', newRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

// Cập nhật Comment
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await RecipeComment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedComment) return res.status(404).json({ message: "Comment không tồn tại." });
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa Comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedRecipeComment = await RecipeComment.findByIdAndDelete(req.params.id);
    if (!deletedRecipeComment) return res.status(404).json({ message: "Comment không tồn tại." });
    res.status(200).json({ message: "Comment đã được xóa thành công." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

  
