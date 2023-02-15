const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addrole')
		.setDescription('Creates a new role')
        .addStringOption(option =>
            option
            .setName('role-name')
            .setDescription('the new role name to create')
            .setRequired(true),
            )
        .addStringOption(option =>
            option
            .setName('color')
            .setDescription('Enter a color or leave blank for random')
            .setRequired(false)),
        // option for student or other here (to setup default permissions)
	};