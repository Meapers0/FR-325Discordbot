const { SlashCommandBuilder } = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-message')
        .setDescription('Sets up the reaction role message'),
    async execute(message, args, Discord, client) {
        // const { channel } = require('../../config.json')
        const students379 = message.guild.roles.cache.find(role => role.name === '379 Students');
        const students325 = message.guild.roles.cache.find(role => role.name === '325 Students');
        const students314 = message.guild.roles.cache.find(role => role.name === '314 Students');
        const students379Emoji = ':one:';
        const students325Emoji = ':two:';
        const students314Emoji = ':three:';

        const embed = new MessageEmbed
            .setColor('#ffffff')
            .setTitle('React to enter the classes you have enrolled in')
            .setDescription('---\n\n'
                + ':one: for 379\n'
                + ':two: for 325\n'
                + ':three: for 314');
        console.log('Reaction message created');
        const msg = await message.channel.send({ embeds: embed });
        msg.react(students379Emoji);
        msg.react(students325Emoji);
        msg.react(students314Emoji);
    },
};