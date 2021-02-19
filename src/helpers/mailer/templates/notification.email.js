import generateToken from '../../generateToken';

const { BACKEND_URL } = process.env;

export default (data) => {
  const token = generateToken(data.receiver);
  const message = {};
  const link = `${BACKEND_URL}/users/unsubscribe/${token}`;
  message.subject = 'Trip notifications';
  message.html = `
  <p style="color:#363636">Hello ${data.receiver.firstName},</p>
  <p style="font-size:1rem;color:#43464b">${data.notificationMessage}
  <br><br>
  <div style="margin-left:12rem">
  <a href='${link}' style="align-item:center;padding:10px 45px;background:#266cef;color:#ffffff;border-radius:2px;text-decoration:none" target='_blank'>Unsubscribe email</a> </p>
  </div>
 `;
  return message;
};
