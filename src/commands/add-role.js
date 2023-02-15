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
    async execute(interaction) {
        const randIntR = Math.floor(Math.random() * 256) + 30;
        const randIntG = Math.floor(Math.random() * 256) + 30;
        const randIntB = Math.floor(Math.random() * 256) + 30;

        console.log(randIntR);
        console.log(randIntB);
        console.log(randIntG);
        const randColor = [randIntR, randIntB, randIntG];
        interaction.guild.roles.create({
            name: interaction.options.data[0].value,
            color: randColor,
            reason: 'Role created via addrole command',
        });
        interaction.reply('Role has been created.');
    },
};