const authService = require("../services/auth.service");

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: "Registration successful", data: result });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({ message: "Login successful", data: result });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    // Assuming authentication middleware attaches user to req.user
    res.status(200).json({ data: req.user });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // Assuming authentication middleware attaches user id to req.user.id
    const userId = req.user.id;
    await authService.changePassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
