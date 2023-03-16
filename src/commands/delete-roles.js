const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete-all')
		.setDescription('Deletes all roles containing students'),
    async execute(interaction) {
        const roles = await interaction.guild.roles.fetch();

        for (const elem of roles) {
            if (elem[1].name.toLowerCase().includes('student')) {
                interaction.guild.roles.delete(elem[1].id);
             }
        }
        interaction.reply('Roles have been deleted');
    },
};