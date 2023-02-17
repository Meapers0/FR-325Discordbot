const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		await interaction.reply('Pong!').catch(err => console.log(err));
	},
};