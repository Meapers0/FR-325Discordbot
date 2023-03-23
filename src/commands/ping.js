const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		try {
			await interaction.reply('Pong!').catch(err => console.log(err));
		}
		catch (error) {
			console.error(error);
		}

	},
};