export class Response {
  static success(res, status, message, data) {
    res.status(status).json({
      message,
      data,
    });
  }
}
