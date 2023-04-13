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
						.setName('prefix')
						.setDescription('Enter the course prefix')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('first-course-number')
						.setDescription('Enter the first course number')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('second-course-number')
						.setDescription('Enter the first course number')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('semester')
						.setDescription('Enter the semester (fall, winter, etc.)')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('year')
						.setDescription('Enter the year the course is occuring')
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
						.setName('prefix')
						.setDescription('Enter the course prefix')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('course-number')
						.setDescription('Enter the course number')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('semester')
						.setDescription('Enter the semester (fall, winter, etc.)')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('year')
						.setDescription('Enter the year the course is occuring')
						.setRequired(true))
				.addBooleanOption(option =>
					option
						.setName('category')
						.setDescription('T/F if a category with channels should be created')
						.setRequired(true),
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction) {
		// COHABITED
		if (interaction.options.data[0].name === 'cohabited-course') {
			const allowedFirstRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[1].value + ' Student'));
			const allowedSecondRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[2].value + ' Student'));
			if ((allowedFirstRole === undefined) || allowedSecondRole === undefined) {
				interaction.reply('Role not yet created, please make the role for the class first.');
				return;
			}
			// if default channels are not to be generated
			if (!interaction.options.data[0].options[5].value) {
				interaction.guild.channels.create({
					name: `${interaction.options.data[0].options[0].value}
					${interaction.options.data[0].options[1].value} / 
					${interaction.options.data[0].options[2].value} -
					${interaction.options.data[0].options[3].value} 
					${interaction.options.data[0].options[4].value}`,
					type: ChannelType.GuildCategory,
				});
			}
			// if default channels are to be generated
			if (interaction.options.data[0].options[5].value) {
				const temp = await interaction.guild.channels.create({
					name: `${interaction.options.data[0].options[0].value} 
					${interaction.options.data[0].options[1].value} / 
					${interaction.options.data[0].options[2].value} - 
					${interaction.options.data[0].options[3].value} 
					${interaction.options.data[0].options[4].value}`,
					type: ChannelType.GuildCategory,
				});
				// announcements
				await interaction.guild.channels.create({
					name: `announcements-${interaction.options.data[0].options[1].value}-${interaction.options.data[0].options[2].value}`,
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
				// zoom meeting
				await interaction.guild.channels.create({
					name: `zoom-meeting-info-$${interaction.options.data[0].options[1].value}-${interaction.options.data[0].options[2].value}`,
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
				// introduce
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
				// chat
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
		// SINGULAR
		if (interaction.options.data[0].name === 'singular-course') {
			const allowedRole = interaction.guild.roles.cache.find(r => r.name === (interaction.options.data[0].options[1].value + ' Student'));
			if (allowedRole === undefined) {
				interaction.reply('Role not yet created, please make the role for the class first.');
				return;
			}
			// if default channels are not to be generated
			if (!interaction.options.data[0].options[1].value) {
				interaction.guild.channels.create({
					name: `${interaction.options.data[0].options[0].value} 
					${interaction.options.data[0].options[1].value} - 
					${interaction.options.data[0].options[2].value} 
					${interaction.options.data[0].options[3].value}`,
					type: ChannelType.GuildCategory,
				});
			}
			// if default channels are to be generated
			if (interaction.options.data[0].options[1].value) {
				const temp = await interaction.guild.channels.create({
					name: `${interaction.options.data[0].options[0].value} 
					${interaction.options.data[0].options[1].value} -  
					${interaction.options.data[0].options[2].value} 
					${interaction.options.data[0].options[3].value}`,
					type: ChannelType.GuildCategory,
				});
				// announcements
				await interaction.guild.channels.create({
					name: `announcements-${interaction.options.data[0].options[1].value}`,
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
				// zoom meeting
				await interaction.guild.channels.create({
					name: `zoom-meeting-info-${interaction.options.data[0].options[1].value}`,
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
				// introduce
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
				// chat
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
			interaction.reply('Channel(s) has been created');
		}
	},
};