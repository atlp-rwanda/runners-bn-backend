import Response from '../helpers/sendResponse';
import code from '../helpers/statusCode';
import CommentService from '../services/commentServices';

/** Class representing trip controller */
class commentController {
  /**
* @description this method adds a comment to a trip
* @param {Object} req provides the requests from body to controllers
* @param {Object} res provides responses to the users
* @return {object} Oject of data or error
* @memberof commentController
*/
  static async addComment(req, res) {
    try {
      const { comment } = req.body;
      const { id } = req.user;
      const commented = await CommentService.add({ userId: id, tripId: req.trip.id, comment });
      return Response.success(res, code.created, 'Comment successfuly added', commented);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
* @description this method retrieves a comment on a trip
* @param {Object} req provides the requests from body to controllers
* @param {Object} res provides responses to the users
* @return {object} Oject of data or error
* @memberof commentController
*/
  static async getcomments(req, res) {
    try {
      const comments = await CommentService.findComments({ tripId: req.params.id });
      return Response.success(res, code.ok, 'Successfully found all the comments', comments);
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }

  /**
* @description this method deletes a comment on a trip
* @param {Object} req provides the requests from body to controllers
* @param {Object} res provides responses to the users
* @return {object} Oject of data or error
* @memberof commentController
*/
  static async deleteComment(req, res) {
    try {
      const deleteComment = await CommentService.delete({ id: req.params.id, userId: req.user.id });
      if (!deleteComment) return Response.error(res, code.notFound, 'comment not found!');
      return Response.success(res, code.ok, 'Successfully delete the comment');
    } catch (error) {
      return Response.error(res, code.serverError, 'Oops something went wrong');
    }
  }
}

export default commentController;
