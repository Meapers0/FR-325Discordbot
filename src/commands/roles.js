const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Brings up role select menu'),
	};