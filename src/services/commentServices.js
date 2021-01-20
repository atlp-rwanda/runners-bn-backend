import models from '../database/models';

const { User, Comment } = models;

const commentator = {
  model: User,
  attributes: ['firstName', 'lastName', 'email']
};
/** Class representing a Comment services . */
class CommentService {
  /**
* @description this method adds a comment to the database
* @param {object} comment contains valid comment attributes
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async add(comment) {
    try {
      return await Comment.create(comment);
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method retrieves all the comments
* @param {object} param is to be checked against where
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async findComments(param) {
    try {
      const comments = await Comment.findAll({
        where: param,
        include: [
          { ...commentator, as: 'commentetor' },
        ]
      });
      return comments.map((comment) => comment.get());
    } catch (error) {
      return error;
    }
  }

  /**
* @description this method deletes a comment
* @param {object} param is to be checked against where
* @returns {object} returns comment object
* @memberof CommentService
*/
  static async delete(param) {
    try {
      return await Comment.destroy({
        where: param,
      });
    } catch (error) {
      return error;
    }
  }
}

export default CommentService;
