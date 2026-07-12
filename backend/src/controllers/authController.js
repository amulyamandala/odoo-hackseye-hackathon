const login = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Login successful",
      data: { token: "mock-jwt-token" },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    res
      .status(201)
      .json({ success: true, message: "Registration successful", data: null });
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register };
