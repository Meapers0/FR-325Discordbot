const { SlashCommandBuilder, PermissionFlagsBits, } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-all')
        .setDescription('Deletes all roles containing students')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            const roles = await interaction.guild.roles.fetch();
            for (const elem of roles) {
                if (elem[1].name.toLowerCase().includes('student') || elem[1].name.toLowerCase().includes('veteran')) {
                    interaction.guild.roles.delete(elem[1].id);
                }
            }
            interaction.reply('Roles have been deleted');
        }
        catch (error) {
            console.error(error);
        }
    },
};