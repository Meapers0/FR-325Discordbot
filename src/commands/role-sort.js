const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-message')
        .setDescription('Sets up the reaction role message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
};