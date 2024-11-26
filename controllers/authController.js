const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });

    // const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, {
    //   expiresIn: '1h',
    // });

    res.json({
      message: 'Đăng nhập thành công!',
      data: {
        username: username,
        id: user._id
      }
    });
    
  } catch (error) {
    console.error(error); // In lỗi ra console để dễ dàng kiểm tra
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

// Đăng ký
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Tài khoản đã tồn tại!' });

    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({message: 'Đăng ký thành công!' , data: {username: username}});
  } catch (error) {
    console.error(error); // In lỗi ra console để dễ dàng kiểm tra
    res.status(500).json({ message: 'Lỗi hệ thống', error: error.message });
  }
};

