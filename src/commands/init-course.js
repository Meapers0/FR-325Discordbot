const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('init-course')
		.setDescription('For creating a new course template')
		.addSubcommand(subcommand =>
			subcommand
				.setName('cohabited-course')
				.setDescription('If your course is Cohabited (requires two roles)')
				.addStringOption(option =>
					option
						.setName('first-course-number')
						.setDescription('Enter the first class number')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('second-course-number')
						.setDescription('Enter the first class number')
						.setRequired(true))
				.addBooleanOption(option =>
					option
						.setName('category')
						.setDescription('T/F if a category with channels should be created')
						.setRequired(true),
				))
		.addSubcommand(subcommand =>
			subcommand
				.setName('singular-course')
				.setDescription('If your course is singular (requires one role)')
				.addStringOption(option =>
					option
						.setName('course-number')
						.setDescription('Enter the course number')
						.setRequired(true))
				.addBooleanOption(option =>
					option
						.setName('category')
						.setDescription('T/F if a category with channels should be created')
						.setRequired(true),
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		if (interaction.options.data[0].name === 'cohabited-course') {
			const allowedFirstRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[0].value + ' Student'));
			const allowedSecondRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[1].value + ' Student'));
			if ((allowedFirstRole === undefined) || allowedSecondRole === undefined) {
				interaction.reply('Role not yet created, please make the role for the class first.');
				return;
			}
			else {
				console.log(allowedFirstRole.name);
				console.log(allowedSecondRole.name);
				console.log(interaction.options.data[0].options[2].value);
			}
			if (!interaction.options.data[0].options[2].value) {
				interaction.guild.channels.create({
					name: `CSC ${interaction.options.data[0].options[0].value} / ${interaction.options.data[0].options[1].value}`,
					type: ChannelType.GuildCategory,
				});
			}
			else {
				const temp = await interaction.guild.channels.create({
					name: `CSC ${interaction.options.data[0].options[0].value} / ${interaction.options.data[0].options[1].value}`,
					type: ChannelType.GuildCategory,
				});
				await interaction.guild.channels.create({
					name: `announcements-${interaction.options.data[0].options[0].value}-${interaction.options.data[0].options[1].value}`,
					type: ChannelType.GuildText,
					parent: temp,
					permissionOverwrites: [
						{
							id: interaction.guild.id,
							deny: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedFirstRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedSecondRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
					],
				});
				await interaction.guild.channels.create({
					name: `zoom-meeting-info-$${interaction.options.data[0].options[0].value}-${interaction.options.data[0].options[1].value}`,
					type: ChannelType.GuildText,
					parent: temp,
					permissionOverwrites: [
						{
							id: interaction.guild.id,
							deny: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedFirstRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedSecondRole.id,
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
							id: allowedFirstRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedSecondRole.id,
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
							id: allowedFirstRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
						{
							id: allowedSecondRole.id,
							allow: [PermissionFlagsBits.ViewChannel],
						},
					],
				});
			}
			interaction.reply('Channel(s) has been created');
		}
		if (interaction.options.data[0].name === 'singular-course') {
			const allowedRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[0].value + ' Student'));
			console.log(allowedRole.name);
			if (allowedRole === undefined) {
				interaction.reply('Role not yet created, please make the role for the class first.');
				return;
			}
			console.log(allowedRole);
			if (!interaction.options.data[0].options[1].value) {
				interaction.guild.channels.create({
					name: `CSC ${interaction.options.data[0].options[0].value}`,
					type: ChannelType.GuildCategory,
				});
			}
			else {
				const temp = await interaction.guild.channels.create({
					name: `CSC ${interaction.options.data[0].options[0].value}`,
					type: ChannelType.GuildCategory,
				});
				await interaction.guild.channels.create({
					name: `announcements-${interaction.options.data[0].options[0].value}`,
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
					name: `zoom-meeting-info-${interaction.options.data[0].options[0].value}`,
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
		}
	},
};