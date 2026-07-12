const { Notification, Employee } = require("../models");

class NotificationService {
  /**
   * Create a notification
   */
  async createNotification(data, recipientId) {
    return await Notification.create({
      ...data,
      recipientId,
      isRead: false,
    });
  }

  /**
   * Get notifications for a specific user
   */
  async getMyNotifications(recipientId) {
    return await Notification.findAll({
      where: { recipientId },
      order: [["createdAt", "DESC"]],
    });
  }

  /**
   * Mark a notification as read
   */
  async markAsRead(notificationId, recipientId) {
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      throw new Error("Notification not found");
    }

    if (notification.recipientId !== recipientId) {
      throw new Error("Unauthorized");
    }

    await notification.update({ isRead: true });
    return notification;
  }
}

module.exports = new NotificationService();
