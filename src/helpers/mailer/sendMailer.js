import sgMail from '@sendgrid/mail';
import * as emailTemplate from './templates';

const sendEmailToUser = async (to, action, data) => {
  const { SENDGRID_API_KEY, FROM_EMAIL, NODE_ENV } = process.env;

  sgMail.setApiKey(SENDGRID_API_KEY);
  const emailSender = emailTemplate[action](data);
  const message = {
    to,
    from: FROM_EMAIL,
    subject: emailSender.subject,
    html: `<div style="background:#ECFOF1;width:100%;padding:20px 0;">
           <div style="max-width:760px;margin:0 auto;background:#ffffff; font-size: 1rem;">
           <div style="padding:20px;text-align:left;color:black" font-family: verdana>
            ${emailSender.html}
           </div>
           </div>
           <div style="padding:5px 10px;margin-left:18rem;">
           Copyright &copy; barefootnomad. 2021 Kigali Rwanda
           </div>
           </div>`
  };
  return NODE_ENV === 'test' ? true : sgMail.send(message);
};

export default sendEmailToUser;
