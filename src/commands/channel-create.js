const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createchannel')
		.setDescription('Creates a channel. Param(name, category)')
        .addStringOption(option => option
            .setName('channelname')
            .setDescription('the new channel to create')
            .setRequired(true),
            )
        .addStringOption(option => option
            .setName('categoryname')
            .setDescription('the new category to create')
            .setRequired(true),
            ),
    async execute(interaction) {
        // console.log(interaction.options.data[0].value);
        if (interaction.options.data[1] === undefined) {
            interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
            });
        }
        else {
            const temp = await interaction.guild.channels.create({
                name: interaction.options.data[1].value,
                type: ChannelType.GuildCategory,
            });
            await interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
                parent: temp,
        });
        }
        interaction.reply('Channel has been created.');
    },
};