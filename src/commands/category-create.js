const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createcategory')
		.setDescription('Creates a category')
        .addStringOption(option =>
            option
            .setName('name')
            .setDescription('the new category to create')
            .setRequired(true),
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        console.log(interaction.options.data[0].value);
        interaction.guild.channels.create({
            name: interaction.options.data[0].value,
            type: ChannelType.GuildCategory,
        });
        interaction.reply('Category has been created.');
    },
};