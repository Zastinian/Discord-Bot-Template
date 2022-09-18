/* Importing the discord.js library, the types.ts file, the fs library, and the config.ts file. */
import {Client, Collection, GatewayIntentBits} from "discord.js"
import * as Types from "./types"
import fs from "fs"
import Config from "../config"

/**
 * @description It loads all the commands and events in the commands and events folders.
 * @author Zastinian
 * @class Bot
 * @extends {Client}
 */
class Bot extends Client {
  /**
   * Creates an instance of Bot.
   * @author Zastinian
   * @memberof Bot
   */
  constructor() {
    super({
      intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
      ],
    })
  }
  /**
   * @description
   * `init()` is a function that calls the `loads()` function and the `login()` function with the
   * `Config.token` parameter.
   * @author Zastinian
   * @memberof Bot
   */
  init() {
    this.loads()
    this.login(Config.token)
  }
  /**
   * @description It loads all the commands and events in the commands and events folders
   * @author Zastinian
   * @memberof Bot
   */
  loads() {
    let commands: Collection<string, Types.Command> = new Collection()
    const commandFiles = fs
      .readdirSync(`${__dirname}\\commands`)
      .filter((file: string) => file.endsWith(".ts"))
    for (const file of commandFiles) {
      const command: Types.Command = require(`${__dirname}\\commands\\${file}`)
      commands.set(command.name, command)
      console.log(`Loaded command '${command.name}'`)
    }
    fs.readdir(__dirname + "/events/", (err: any, files: string[]) => {
      if (err) console.log(err)
      files.forEach((file: string) => {
        if (!file.endsWith(".ts")) return
        const evt: Function = require(__dirname + "/events/" + file)
        let evtName = file.split(".")[0]
        console.log(`Loaded event '${evtName}'`)
        this.on(evtName, evt.bind(null, this, commands))
      })
    })
  }
}

export default Bot
