const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Brings up role select menu')
        .addStringOption(option =>
            option
            .setName('name')
            .setDescription('the new channel to create')
            .setRequired(true),
            ),
	};