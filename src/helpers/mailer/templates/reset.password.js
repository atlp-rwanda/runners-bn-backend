import generateToken from '../../generateToken';

const { BACKEND_URL } = process.env;

export default (data) => {
  const token = generateToken(data);
  const message = {};
  const link = `${BACKEND_URL}/resetPassword/${token}`;
  message.subject = 'Reset your password';
  message.html = `
  <p style="color:#363636">Hello ${data.firstName},</p>
  <p style="font-size:1rem;color:#43464b">You are receiving this email becuase you requested to reset your password,<br>
  Click on the button below to complete the process<br>
  <br><br>
  <div style="margin-left:12rem">
  <a href='${link}' style="align-item:center;padding:10px 45px;background:#266cef;color:#ffffff;border-radius:2px;text-decoration:none" target='_blank'>Reset Password</a> </p>
  </div>
 `;
  return message;
};
