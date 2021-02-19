import { Notification, User } from '../database/models';

/** Class representing a Trip services . */
class NotificationService {
  /**
* @description this method validate user inputs
* @param {object} param contains valid request attributes
* @returns {object} returns schema object
* @memberof TripService
*/
  static async getNotifications(param) {
    try {
      const results = await Notification.findAll({
        where: { ...param, isRead: false },
        include: [{ model: User, as: 'creator', attributes: ['firstName', 'lastName'] }],
        order: [['createdAt', 'DESC']],
      });

      return {
        unread: results.length,
        notifications: results,
      };
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method validate user inputs
* @param {object} notification contains valid request attributes
* @returns {object} returns schema object
* @memberof TripService
*/
  static async create(notification) {
    try {
      const results = await Notification.create(notification);
      return results;
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method validate user inputs
* @param {object} param contains valid request attributes
* @returns {object} returns schema object
* @memberof TripService
*/
  static async markAsRead(param) {
    try {
      const read = await Notification.update(
        { isRead: true },
        {
          where: param,
        }
      );
      return read;
    } catch (error) {
      return error;
    }
  }
}

export default NotificationService;
