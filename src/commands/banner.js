//pulls a users banner from their profile
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Get the banner URL of the selected user, or your own banner.')
        .addUserOption(option => option.setName('target').setDescription('The user\'s banner to show')),
    async execute(interaction) {
        const user = interaction.options.getUser('target');
        if (user) return interaction.reply(`${user.username}'s banner: ${user.displayBannerURL({ dynamic:true })}`);
        return interaction.reply(`Your banner: ${interaction.user.displayBannerURL()}`);
    },
};