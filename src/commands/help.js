const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('A list of commands'),
	async execute(interaction) {
		console.log(interaction.client.commandNames);
		const embed = new EmbedBuilder()
			.addFields(
				interaction.client.commandNames);
		interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed] });
	},
};