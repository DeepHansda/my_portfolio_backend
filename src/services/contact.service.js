const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

const mailService = (data, callback) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:process.env.MAIL_USERNAME,
      pass:process.env.MAIL_PASSWORD,
    },
  });

  readHTMLFile(
    path.join(__dirname, "../templates/mail.html"),
    (error, html) => {
      if (error) {
        console.error(error);
      }
      const template = handlebars.compile(html);
      const replacement = {
        fullName: data.fullName,
      };
      const htmlToSend = template(replacement);
      let mailOptions = {
        from: `Deep Hansda <${process.env.MAIL_USERNAME}>`,
        to: data.email,
        subject: "Message From Deep hansda",
        html: htmlToSend,
      };

      transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      });
    }
  );
};

module.exports = { mailService: mailService };
