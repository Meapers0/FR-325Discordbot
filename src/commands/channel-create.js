const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Creates a channel. Param(name, category)')
        .addStringOption(option =>
            option
            .setName('name')
            .setDescription('the new channel to create')
            .setRequired(true),
            )
        .addStringOption(option =>
            option
            .setName('category')
            .setDescription('the new category to create')
            .setRequired(true),
            ),
	};