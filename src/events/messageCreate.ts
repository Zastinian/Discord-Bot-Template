export {};

import * as Types from "../types";
import Discord from "discord.js";
import Config from "../../config";

const PREFIX = Config.prefix as string;

module.exports = async (
	client: Discord.Client,
	commands: Discord.Collection<string, Types.Command>,
	message: Discord.Message
) => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;
	else {
		const command = message.content
			.toString()
			.slice(PREFIX.length)
			.trim()
			.split(" ")
			.shift()!
			.toLowerCase();

		if (!commands.has(command)) return;
		try {
			commands.get(command)!.run(message, client);
		} catch (error) {
			console.log(error);
		}
	}
};