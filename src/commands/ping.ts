/* Exporting the module. */
export {}
/* Importing the Discord.js library. */
import Discord from "discord.js"
/**
 * @description Exporting the module
 * @author Zastinian
 * @param {string} name
 * @param {string} description
 * @param {Function} run
 */
module.exports = {
  name: "ping",
  description: "ping",
  run: async (message: Discord.Message, client: Discord.Client) => {
    return message.reply({
      content: "Pong!",
    })
  },
}
