
class NotificationController {
    
  constructor(notificationService) {
    this.notificationService = notificationService;
  }

  async getNotifications(req, res) {
    const { userId } = req.params;
    const notifications = await this.notificationService.getNotifications(userId);
    res.json(notifications);
  }
}