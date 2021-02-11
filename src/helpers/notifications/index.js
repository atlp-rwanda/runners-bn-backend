import app from '../sockets';
import NotificationService from '../../services/notificationServices';
import TripServices from '../../services/tripServices';
import sendEmailToUser from '../mailer/sendMailer';
import actionsEnum from '../actions';
import UserService from '../../services/userServices';

/** Class representing all notifications */
export default class Notifier {
  /**
* @description this method notifies a user in app
* @param {object} description  provides a message notification to the receiver
* @param {object} receiver indicates someone who have to get the notification
* @param {object} requester indicates someone who triggered the notification
* @param {object} tripId indicates the id of the trip the notification originated from
* @param {object} event  indicates the event
* @returns {object} returns object
* @memberof Notifier
*/
  static async notify(
    description,
    receiver,
    requester,
    tripId,
    event = 'new-notification'
  ) {
    const created = await NotificationService.create({
      tripId,
      description,
      receiverId: receiver,
      creatorId: requester,
    });
    app.io.emit(event, created);
  }

  /**
* @description this method notifies a user in email
* @param {object} receiver indicates the receiver
* @param {object} notificationMessage is the notification message
* @returns {object} returns object
* @memberof Notifier
*/
  static async emailNotify(receiver, notificationMessage) {
    if (receiver.emailAllowed) {
      const data = {
        receiver,
        notificationMessage
      };
      await sendEmailToUser(receiver.email, actionsEnum.notificationEmail, data);
    }
  }

  /**
* @description this method listens to the created trip event
* @param {object} request  indicates the request that was listened
* @returns {object} returns object
* @memberof Notifier
*/
  static async handleCreatedTripRequest(request) {
    try {
      const { id, managerId, userId } = request;
      const { firstName: requester } = await UserService.findUser({ id: userId });
      const receiver = await UserService.findUser({ id: managerId });
      const notificationMessage = `${requester} requested a new trip`;
      Notifier.notify(notificationMessage, managerId, userId, id);
      Notifier.emailNotify(receiver, notificationMessage);
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method listens to the created trip event
* @param {object} request  indicates the request that was listened
* @returns {object} returns object
* @memberof Notifier
*/
  static async handleUpdatedTripRequest({ dataValues: request, _changed }) {
    try {
      const {
        id,
        managerId,
        userId,
      } = request;
      const changes = Array.from(_changed);
      const receiptient = managerId;
      const sender = userId;
      const { firstName: requester } = await UserService.findUser({ id: sender });
      const receiver = await UserService.findUser({ id: managerId });
      const notificationMessage = `${requester} updated "${changes.join('", "')}" on a trip`;
      Notifier.notify(notificationMessage, receiptient, sender, id);
      Notifier.emailNotify(receiver, notificationMessage);
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method listens to the created trip event
* @param {object} comment  indicates the request that was listened
* @returns {object} returns object
* @memberof Notifier
*/
  static async handleCommentedOnTripRequest(comment) {
    try {
      const {
        id,
        comment: msg,
        tripId,
        userId
      } = comment;
      const [{ userId: requesterId, managerId }] = await TripServices.findAll({
        id: tripId,
      });
      const receiptient = managerId === userId ? requesterId : managerId;
      const { firstName: requester } = await UserService.findUser({ id: userId });
      const receiver = await UserService.findUser({ id: receiptient });
      const messagePart = msg.length > 24 ? `${msg.split('').slice(0, 24).join('')}...` : msg;
      const notificationMessage = `${requester} commented on a trip: ${messagePart}`;
      Notifier.notify(notificationMessage, receiptient, userId, id);
      Notifier.emailNotify(receiver, notificationMessage);
    } catch (error) {
      return error;
    }
  }
}
