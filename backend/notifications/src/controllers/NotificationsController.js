const isMessageValid = (message) =>
  message.target && message.subject && message.textBody && message.htmlBody;

async function onMessageArrived(msg) {
  const message = JSON.parse(msg.toString());

  console.log("Received '%s'", message);

  // Check if the message packet has the required fields
  if (isMessageValid(message)) {
    console.log("message is valid!");
    // Call the send function on EmailService (in my case: import the API for sending over socket.io)
    /*await emailService
    .send(message.target, message.subject, message.textBody, message.htmlBody)
    .then((p) => console.log(`[AMQP] Done, message ID : ${p.messageId}`))
    .catch((err) => console.log(`[ERROR] Error: ${err}`));*/
  } else {
    console.log(`[WARNING] Message did not respect standard format`);
  }
}

module.exports = { onMessageArrived };
