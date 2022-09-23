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
/* Extending the Client class. */
class Bot extends Client {
  /**
   * Creates an instance of Bot.
   * @author Zastinian
   * @memberof Bot
   */
  /**
   * The constructor function is a function that is called when an object is created from a class.
   */
  constructor() {
    /* Creating a new instance of the Client class. */
    super({
      /* An array of the intents that the bot will use. */
      intents: [
        /* An intent that allows the bot to read messages. */
        GatewayIntentBits.MessageContent,
        /* It allows the bot to read guilds. */
        GatewayIntentBits.Guilds,
        /* It allows the bot to read guild members. */
        GatewayIntentBits.GuildMembers,
        /* It allows the bot to read guild messages. */
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
    /* Loading all the commands and events in the commands and events folders. */
    this.loads()
    /* Logging the bot in with the token in the config.ts file. */
    this.login(Config.token)
  }
  /**
   * @description It loads all the commands and events in the commands and events folders
   * @author Zastinian
   * @memberof Bot
   */
  loads() {
    /* Creating a new Collection object called commands. */
    let commands: Collection<string, Types.Command> = new Collection()
    /* Getting all the files in the commands folder and filtering out the ones that don't end with .ts. */
    const commandFiles = fs
      .readdirSync(`${__dirname}\\commands`)
      .filter((file: string) => file.endsWith(".ts"))
    /* Loading all the commands in the commands folder. */
    for (const file of commandFiles) {
      /* Loading the command in the file. */
      const command: Types.Command = require(`${__dirname}\\commands\\${file}`)
      /* Setting the command name as the key and the command as the value. */
      commands.set(command.name, command)
      /* Logging the command name to the console. */
      console.log(`Loaded command '${command.name}'`)
    }
    /* Loading all the events in the events folder. */
    /* Reading the files in the events folder. */
    fs.readdir(__dirname + "/events/", (err: any, files: string[]) => {
      /* Checking if there is an error and if there is, it logs it to the console. */
      if (err) console.log(err)
      /* Looping through all the files in the events folder. */
      files.forEach((file: string) => {
        /* Checking if the file ends with .ts and if it doesn't, it returns. */
        if (!file.endsWith(".ts")) return
        /* Loading the event in the file. */
        const evt: Function = require(__dirname + "/events/" + file)
        /* Getting the name of the event. */
        let evtName = file.split(".")[0]
        /* Logging the event name to the console. */
        console.log(`Loaded event '${evtName}'`)
        /* Binding the `this` keyword to the `null` parameter, the `this` keyword to the `this`
        parameter, and the `commands` variable to the `commands` parameter. */
        this.on(evtName, evt.bind(null, this, commands))
      })
    })
  }
}

/* Exporting the Bot class. */
export default Bot
