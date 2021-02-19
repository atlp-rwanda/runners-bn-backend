import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import notificationService from '../services/notificationServices';

/** Class representing notifications controller */
class Notifications {
  /**
* @description this method gets all notifications
* @param {Object} req request
* @param {Object} res response
* @return {object} Oject of data or error
* @memberof commentController
*/
  static async getNotifications(req, res) {
    try {
      const { id } = req.user;
      const data = await notificationService.getNotifications({ receiverId: id });
      return Response.success(
        res,
        code.ok,
        'Your Notifications have been retrieved successfully',
        data
      );
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong!');
    }
  }

  /**
* @description this method marks one or all as read
* @param {Object} req request
* @param {Object} res response
* @return {object} Oject of data or error
* @memberof commentController
*/
  static async markAsRead(req, res) {
    try {
      const param = req.query.id ? { id: req.query.id } : { receiverId: req.user.id };
      const data = await notificationService.markAsRead({ ...param, isRead: false });
      let message = data > 1 ? 'Notifications' : 'Notification';
      message += ' successfully marked as read';
      if (data[0] === 0) message = 'No Notifications was marked as read';
      return Response.success(res, code.ok, message, `${data} marked as read`);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong!');
    }
  }
}

export default Notifications;
