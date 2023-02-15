const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('initclass')
		.setDescription('For creating a new class template')
        .addStringOption(option =>
            option
            .setName('role-name')
            .setDescription('the new role to create (class number)')
            .setRequired(true),
            )
        .addBooleanOption(option =>
            option
            .setName('category')
            .setDescription('T/F if a category with channels should be created')
            .setRequired(true),
            ),
    async execute(interaction) {
        if (!interaction.options.data[1].value) {
			interaction.guild.channels.create({
				name: `CSC ${interaction.options.data[0].value}`,
				type: ChannelType.GuildCategory,
			});
		}
		else {
			const temp = await interaction.guild.channels.create({
				name: `CSC ${interaction.options.data[0].value}`,
				type: ChannelType.GuildCategory,
			});
			await interaction.guild.channels.create({
				name: `announcements-${interaction.options.data[0].value}`,
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: `zoom-meeting-info-${interaction.options.data[0].value}`,
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: 'introduce-yourself',
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: 'chat',
				type: ChannelType.GuildText,
				parent: temp,
			});
		}
		interaction.reply('Channel has been created');
    },
};