/* Exporting the module. */
export {};
/* It's importing the types, discord.js, and the config file. */
import * as Types from "../types";
import Discord from "discord.js";
import Config from "../../config";
/**
 * @description It's a type assertion. It's telling the compiler that the value of `Config.prefix` is a string.
 * @type {String} PREFIX
 * */
const PREFIX: string = Config.prefix as string;
/**
 * @description It's a function that will run a command if the message starts with the prefix and if the command
 * @author Zastinian
 * @param {Discord.Client} client
 * @param {Discord.Collection<string, Types.Command>} commands
 * @param {Discord.Message} message
 */
/**
 * It's a function that will run a command if the message starts with the prefix and if the command
 * exists
 * @param client - Discord.Client - It's telling the compiler that the value of `client` is a
 * Discord.Client.
 * @param commands - Discord.Collection<string, Types.Command>
 * @param message - Discord.Message - It's telling the compiler that the value of `message` is a
 * Discord.Message.
 * @returns It's returning the value of the function.
 */
const messageCreate = async (
  /* It's telling the compiler that the value of `client` is a Discord.Client. */
  client: Discord.Client,
  /* It's telling the compiler that the value of `commands` is a Discord.Collection. */
  commands: Discord.Collection<string, Types.Command>,
  /* It's telling the compiler that the value of `message` is a Discord.Message. */
  message: Discord.Message
) => {
  /* It's checking if the message doesn't start with the prefix or if the author of the message is a
  bot. If it is, it will return. */
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  /* It's getting the command from the message. */
  const command = message.content.toString().slice(PREFIX.length).trim().split(" ").shift()!.toLowerCase();
  /* It's checking if the command exists. If it doesn't, it will return. */
  if (!commands.has(command)) return;
  /* It's catching any errors that may occur when running the command. */
  try {
    /* It's getting the command from the collection and running it. */
    commands.get(command)!.run(message, client);
  } catch (error) {
    /* It's logging the error to the console. */
    console.log(error);
  }
};

/* It's exporting the function. */
module.exports = messageCreate;
