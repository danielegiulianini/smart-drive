const amqp = require("amqplib");
const amqpConfig = require("../config/amqp.config");
//const emailService = require("../services/EmailService");

const isMessageValid = (message) =>
  message.target && message.subject && message.textBody && message.htmlBody;

async function onMessageArrived(msg) {
  const message = JSON.parse(msg.content.toString());

  console.log("[AMQP] Received '%s'", message);

  // Check if the message packet has the required fields
  if (isMessageValid(message)) {
    // Call the send function on EmailService
    /*await emailService
      .send(message.target, message.subject, message.textBody, message.htmlBody)
      .then((p) => console.log(`[AMQP] Done, message ID : ${p.messageId}`))
      .catch((err) => console.log(`[ERROR] Error: ${err}`));*/
  } else {
    console.log(`[WARNING] Message did not respect standard fromat`);
  }
}

const setup = async () => {
  // Connect to AMQP broker

  try {
    const conn = await amqp.connect(amqpConfig.brokerUri);
    process.once("SIGINT", function () {
      conn.close();
    });
    const ch = await conn.createChannel();
    let ok = ch.assertQueue(amqpConfig.queues.notifications, {
      durable: true,
    });

    //run futures in parallel
    ok = ok.then(function (_qok) {
      return ch.consume(amqpConfig.queues.notifications, onMessageArrived, {
        noAck: true,
      });
    });

    return ok.then(function (_consumeOk) {
      console.log("[AMQP] Waiting for messages.");
    });
  } catch (e) {
    console.warn(e);
  }
};

module.exports = {
  setup,
};

/**
 * promise-based code: 
 * const connect = () => {
  // Connect to AMQP broker
  amqp
    .connect(amqpConfig.brokerUri)
    .then(function (conn) {
      process.once("SIGINT", function () {
        conn.close();
      });
      return conn.createChannel().then(function (ch) {
        let ok = ch.assertQueue(amqpConfig.queues.notifications, {
          durable: true,
        });

        ok = ok.then(function (_qok) {
          return ch.consume(amqpConfig.queues.notifications, onMessageArrived, {
            noAck: true,
          });
        });

        return ok.then(function (_consumeOk) {
          console.log("[AMQP] Waiting for messages.");
        });
      });
    })
    .catch(console.warn);
};
 * 
 */
