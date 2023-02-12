const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reaction-message')
        .setDescription('Sets up the reaction role message'),
    async execute(message) {

        // const students379 = message.guild.roles.cache.find(role => role.name === '379 Students');
        // const students325 = message.guild.roles.cache.find(role => role.name === '325 Students');
        // const students314 = message.guild.roles.cache.find(role => role.name === '314 Students');
        const students379Emoji = '1️⃣';
        const students325Emoji = '2️⃣';
        const students314Emoji = '3️⃣';

        const newEmbed = new EmbedBuilder()
            .setColor('#ffffff')
            .setTitle('React to enter the classes you have enrolled in')
            .setDescription('---\n\n'
                + `${students379Emoji} for 379\n`
                + `${students325Emoji} for 325\n`
                + `${students314Emoji} for 314\n`);
        console.log('Reaction message created');
        message.channel.send({ embeds: [newEmbed] }).then(embedMessage => {
            embedMessage.react(students379Emoji);
            embedMessage.react(students325Emoji);
            embedMessage.react(students314Emoji);
        });
    },
};