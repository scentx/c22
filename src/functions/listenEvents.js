const fs = require("fs-extra");
const chalk = require("chalk");
const { sendLog } = require("./logging.js");

function listenEvents(client, guildId) {
  fs.readdir("./src/events/", (_err, files) => {
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;

      const event = require(`../events/${file}`);

      if (
        file.includes("catching") ||
        file.includes("commands") ||
        file.includes("misc")
      ) {
        eventName = "messageCreate";
      } else eventName = file.split(".")[0];

      if (typeof event === "function") {
        client.on(eventName, event.bind(null, client, guildId));
        eventName = file.split(".")[0];
        sendLog(
          null,
          `Listening for event: ${chalk.yellow.bold(eventName)}`,
          "debug"
        );
      } else {
        console.log(
          `${chalk.redBright(`[EVENT]`)} Invalid event: ${eventName}`
        );
      }
    });
  });
}

module.exports = { listenEvents };
