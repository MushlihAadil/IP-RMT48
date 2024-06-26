const createMailTransporter = require("./createMailTransporter");

const sendGreetingMail = (user) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"HarryPotterWebsite" <"mmushlih.alaadil29@gmail.com">',
    to: user.email,
    subject: "Greeting...",
    html: `<P> Hello, thanks for joining and welcome to Harry Potter Website <P>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Greeting email sent");
    }
  });
};

module.exports = sendGreetingMail;