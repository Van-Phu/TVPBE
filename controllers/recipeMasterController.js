const RecipeMaster = require('../models/recipeModel');
const SavedRecipe = require('../models/savedRecipeModel');
const User = require('../models/userModel');

// Lấy danh sách tất cả Recipe
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeMaster.find().populate('Author', "-password") ;
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSavedRecipes = async (req, res) => {
  try {
    // const recipes = await SavedRecipe.find({User: req.params.id}).populate('Recipe', 'Recipe');
    const savedRecipes = await SavedRecipe.find({ User: req.params.id })
      .populate({
        path: 'Recipe',
        populate: { path: 'Author', select: '-password' }
      });

    const recipes = savedRecipes.map(saved => saved.Recipe);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipesByAuthor = async (req, res) => {
  const { username } = req.params; // Lấy giá trị username từ URL

  try {

    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng với username này' });
    }

    const recipes = await RecipeMaster.find({ Author: user._id }).populate('Author', "-password");

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
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
    const {recipe, user} = req.body;
    try {

      const recipeSche = await RecipeMaster.findById(recipe).populate('Author', "-password");
      if (!recipeSche) return res.status(404).json({ message: "Recipe không tồn tại." });

      const numOfPost = await RecipeMaster.countDocuments({ Author: recipeSche.Author._id });
      const isSaved = await SavedRecipe.findOne({ User: user, Recipe: recipe });
      
      const popularRecipes = await RecipeMaster.find({Author: recipeSche.Author._id }).select(['_id','Thumbnail'])
        .sort({ NumOfSaved: -1 }) // Sort by NumOfSaved in descending order
        .limit(5); 

      // // recipe['numOfPost'] = numOfPost;
      // // recipe['popularRecipes'] = popularRecipes;
      // recipe.Author.numOfPost = numOfPost;
      // recipe.Author.popularRecipes = popularRecipes;
      const recipeWithAdditionalInfo = {
        ...recipeSche.toObject(), 
        numOfPost,             
        popularRecipes,
        isSaved        
      };

      res.status(200).json(recipeWithAdditionalInfo);
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
      const { ids } = req.body;
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Danh sách IDs không hợp lệ." });
      }

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

exports.saveRecipe = async (req, res) => {
  const { Recipe, User, ...otherFields } = req.body;
  try {
    const newRecipe = new SavedRecipe({
      Recipe: Recipe._id,
      User: User.id,
      ...otherFields, 
    });

    await newRecipe.save();
    const recipe = await RecipeMaster.findByIdAndUpdate(newRecipe.Recipe, { $inc: { NumOfSaved: 1 } } ,{ new: true });
    
    res.status(201).json({ message: 'Công thức đã được lưu thành công', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

exports.unSaveRecipe = async (req, res) => {
  try {
  const { Recipe, User} = req.body;
    
    const deletedRecipe = await SavedRecipe.findOneAndDelete({Recipe: Recipe, User: User.id});
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe không tồn tại." });
    const recipe = await RecipeMaster.findByIdAndUpdate(deletedRecipe.Recipe._id, { $inc: { NumOfSaved: -1 } } ,{ new: true });
    if (!recipe) return res.status(404).json({ message: "Không tìm thấy công thức." });

    res.status(201).json({ message: 'Huỷ lưu thành công', recipe });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};
  

  
