/* Exporting the module. */
export {};
/* Importing the Discord.js library. */
import Discord from "discord.js";
/**
 * @description Defining the command.
 * @author Zastinian
 * @param {string} name
 * @param {string} description
 * @param {Function} run
 */
/* Exporting the module. */
module.exports = {
  /* Defining the name of the command. */
  name: "ping",
  /* Defining the description of the command. */
  description: "ping",
  /* Defining the function that will be run when the command is called. */
  run: async (message: Discord.Message, client: Discord.Client) => {
    /* Returning the message.reply function. */
    return message.reply({
      content: "Pong!",
    });
  },
};
