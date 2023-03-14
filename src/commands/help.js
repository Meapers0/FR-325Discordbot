const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('A list of commands')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.addFields(
				interaction.client.commandData);
		interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed] });
	},
};