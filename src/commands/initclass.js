const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('initclass')
		.setDescription('For creating a new class template')
        .addStringOption(option =>
            option
            .setName('role-name')
            .setDescription('the new role to create (class number)')
            .setRequired(true),
            )
        .addBooleanOption(option =>
            option
            .setName('category')
            .setDescription('T/F if a category with channels should be created')
            .setRequired(true),
            ),
	};