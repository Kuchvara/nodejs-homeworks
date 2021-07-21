const Mailgen = require('mailgen')
const sgMail = require('@sendgrid/mail')

const createTemplate = (verifyToken, email) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'System Contacts',
      link: 'http://localhost:3000/'
    }
  })

  const template = {
    body: {
      name: email,
      intro: 'Welcome to Contacts',
      action: {
        instructions: 'To get started with Contacts, please click here:',
        button: {
          color: '#23BC70',
          text: 'Confirm your account',
          link: `http://localhost:3000/api/users/verify/${verifyToken}`
        }
      }
    }
  }

  const emailBody = mailGenerator.generate(template)
  return emailBody
}

const sendEmail = async (verifyToken, email) => {
  const emailBody = createTemplate(verifyToken, email)

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    to: email,
    from: 'yourVerifiedMail@something.something',
    subject: 'Thank you for registration',
    text: 'Sending with SendGrid is Fun',
    html: emailBody,
  }

  await sgMail.send(msg)
}

module.exports = {
  sendEmail
}
