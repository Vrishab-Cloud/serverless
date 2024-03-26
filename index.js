const functions = require("@google-cloud/functions-framework");
const { sendEmail } = require("./mail");
const db = require("./models");

functions.cloudEvent("cloudEvent", async (cloudEvent) => {
  const base64name = cloudEvent.data.message.data;

  const dataReceived = base64name
    ? Buffer.from(base64name, "base64").toString()
    : "Error receiving data";

  const jsonObj = JSON.parse(dataReceived);

  await db.init();

  try {
    const email = await db.Email.findByPk(jsonObj.token);
    if (email.expireAt == null) {
      await email.update({ expireAt: new Date().toISOString() });
    }
  } catch (err) {
    console.error("Email doesn't exist: ", err);
  }

  try {
    sendEmail(jsonObj.email, jsonObj.token);
    console.log(jsonObj);
  } catch (err) {
    console.error("Error while sending email: ", err);
  }
});
