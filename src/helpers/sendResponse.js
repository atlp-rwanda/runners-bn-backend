/** Class representing responses . */
export default class Response {
  /**
* @description this method validate user result
* @param {object} res
* @param {object} status
* @param {object} message
* @param {object} data
* @returns {object} success
* @memberof Response
*/
  static success(res, status, message, data) {
    res.status(status).json({
      message,
      data,
    });
  }

  /**
* @description this method validate user result
* @param {object} res
* @param {object} status
* @param {object} error
* @returns {object} error
* @memberof Response
*/
  static error(res, status, error) {
    res.status(status).json({
      error,
    });
  }
}
