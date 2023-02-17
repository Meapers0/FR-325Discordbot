const { SlashCommandBuilder, PermissionFlagsBits, PermissionsBitField } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them (but not really).')
		.addUserOption(option => option.setName('target').setDescription('The member to kick'))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		if (member.permissions.has([PermissionsBitField.Flags.KickMembers, PermissionsBitField.Flags.BanMembers])) {
			return interaction.reply({ content: `You wanted to kick: ${member.user.username}`, ephemeral: true });
		}
		else {
			return interaction.reply({ content: 'You do not have permissions for this command', ephemeral: true });
		}
	},
};