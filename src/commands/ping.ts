export {};
import Discord from "discord.js";

module.exports = {
	name: "ping",
	description: "ping",
	run: async (message: Discord.Message, client: Discord.Client) => {
		return message.reply({
			content: 'Pong!'
		});
	},
};