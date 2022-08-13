import { Client, Collection, GatewayIntentBits } from "discord.js";
import * as Types from './types';
import fs from 'fs';

class Bot extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages
            ]
        })
    }
    
    init() {
        this.loads();
        this.login('token');
    }

    loads() {
        let commands: Collection<
        string,
        Types.Command
    > = new Collection();

    const commandFiles = fs
        .readdirSync(`${__dirname}\\commands`)
        .filter((file: string) => file.endsWith(".ts"));

    for (const file of commandFiles) {
        const command: Types.Command = require(`${__dirname}\\commands\\${file}`);

        commands.set(command.name, command);

        console.log(`Loaded command '${command.name}'`);
    }

    fs.readdir(__dirname + "/events/", (err: any, files: string[]) => {
        if (err) console.log(err);

        files.forEach((file: string) => {
            if (!file.endsWith(".ts")) return;

            const evt: Function = require(__dirname + "/events/" + file);

            let evtName = file.split(".")[0];

            console.log(`Loaded event '${evtName}'`);

            this.on(evtName, evt.bind(null, this, commands));
        });
    });
    }
}

export default Bot;