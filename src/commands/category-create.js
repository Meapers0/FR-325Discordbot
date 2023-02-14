const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createcategory')
		.setDescription('Creates a category')
        .addStringOption(option =>
            option
            .setName('name')
            .setDescription('the new category to create')
            .setRequired(true),
            ),
	};