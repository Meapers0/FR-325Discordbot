const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-students')
        .setDescription('This will give you a count of the number of students in the discord')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const members = await interaction.guild.members.fetch();
        let studentCount = 0;
        let vetCount = 0;
        for (const ele of members) {
            ele[1].roles.cache.forEach(async element => {
                if (element.name.toLowerCase().includes('student')) {
                    studentCount++;
                }
                else if (element.name.toLowerCase().includes('veteran')) {
                    vetCount++;
                }
            });
        }
        await interaction.reply('The server has ' + studentCount + ' students and ' + vetCount + ' veterans.');
    },
};