const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-message')
        .setDescription('Sets up the reaction role message'),
    async execute(message, args, Discord) {
        const students379 = message.guild.roles.cache.find(role => role.name === '379 Students');
        const students325 = message.guild.roles.cache.find(role => role.name === '325 Students');
        const students314 = message.guild.roles.cache.find(role => role.name === '314 Students');
        const students379Emoji = ':one:';
        const students325Emoji = ':two:';
        const students314Emoji = ':three:';

        const newEmbed = new EmbedBuilder()
            .setColor('#ffffff')
            .setTitle('React to enter the classes you have enrolled in')
            .setDescription('---\n\n'
                + ':one: for 379\n'
                + ':two: for 325\n'
                + ':three: for 314');
        console.log('Reaction message created');
        message.channel.send({ embeds: [newEmbed] });
    },
};