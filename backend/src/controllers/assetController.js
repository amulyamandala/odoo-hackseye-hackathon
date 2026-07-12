const getAssets = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "Assets fetched successfully",
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

const createAsset = async (req, res, next) => {
  try {
    res
      .status(201)
      .json({
        success: true,
        message: "Asset created successfully",
        data: null,
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAssets, createAsset };
