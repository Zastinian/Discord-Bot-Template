/* Exporting the module. */
export {}

/* It's importing the types, discord.js, and the config file. */
import * as Types from "../types"
import Discord from "discord.js"
import Config from "../../config"

/**
 * @description It's a type assertion. It's telling the compiler that the value of `Config.prefix` is a string.
 * @type {String} PREFIX
 * */
const PREFIX: string = Config.prefix as string

/**
 * @description It's a function that is called when a message is sent.
 * @author Zastinian
 * @param {Discord.Client} client
 * @param {Discord.Collection<string, Types.Command>} commands
 * @param {Discord.Message} message
 */
/* It's exporting the function. */
module.exports = async (
  client: Discord.Client,
  commands: Discord.Collection<string, Types.Command>,
  message: Discord.Message
) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return
  else {
    const command = message.content.toString().slice(PREFIX.length).trim().split(" ").shift()!.toLowerCase()
    if (!commands.has(command)) return
    try {
      commands.get(command)!.run(message, client)
    } catch (error) {
      console.log(error)
    }
  }
}
