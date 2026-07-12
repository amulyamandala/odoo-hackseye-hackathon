const notificationService = require("../services/notification.service");

exports.getMyNotifications = async (req, res, next) => {
  try {
    const recipientId = req.user.id;
    const notifications =
      await notificationService.getMyNotifications(recipientId);
    res.status(200).json({ data: notifications });
  } catch (error) {
    next(error);
  }
};

exports.markAsRead = async (req, res, next) => {
  try {
    const recipientId = req.user.id;
    const notification = await notificationService.markAsRead(
      req.params.id,
      recipientId,
    );
    res.status(200).json({ data: notification });
  } catch (error) {
    next(error);
  }
};

exports.markAllAsRead = async (req, res, next) => {
  res.status(501).json({ message: "Not implemented" });
};
