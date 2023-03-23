const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

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
            )
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
		// const allowedRole = interaction.options.data[0].value + ' Student';
		const allowedRole = interaction.guild.roles.cache.find(r => r.name === interaction.options.data[0].value + ' Student');
		if (allowedRole === undefined) {
			interaction.reply('Role not yet created, please make the role for the class first.');
			return;
		}
		console.log(allowedRole);
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
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
					{
					id: allowedRole.id,
					allow: [PermissionFlagsBits.ViewChannel],
					},
				],
			});
			await interaction.guild.channels.create({
				name: `zoom-meeting-info-${interaction.options.data[0].value}`,
				type: ChannelType.GuildText,
				parent: temp,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
					{
					id: allowedRole.id,
					allow: [PermissionFlagsBits.ViewChannel],
					},
				],
			});
			await interaction.guild.channels.create({
				name: 'introduce-yourself',
				type: ChannelType.GuildText,
				parent: temp,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
					{
					id: allowedRole.id,
					allow: [PermissionFlagsBits.ViewChannel],
					},
				],
			});
			await interaction.guild.channels.create({
				name: 'chat',
				type: ChannelType.GuildText,
				parent: temp,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
					{
					id: allowedRole.id,
					allow: [PermissionFlagsBits.ViewChannel],
					},
				],
			});
		}
		interaction.reply('Channel has been created');
    },
};