const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('A list of commands')
		.addSubcommand(subcommand =>
			subcommand
					.setName('admin')
					.setDescription('Displays all commands'),
					)
					.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addSubcommand(subcommand =>
			subcommand
					.setName('student')
					.setDescription('Displays all commands avaiable to students'))
					.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
	async execute(interaction) {
		try {
			if (interaction.options.data[0].name === 'admin') {
			const embed = new EmbedBuilder()
				.addFields(interaction.client.commandData);
			interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed] });
				}
			if (interaction.options.data[0].name === 'student') {
					const embed = new EmbedBuilder()
						.addFields(
							interaction.client.commandDataStu);
					interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed] });
						}
		}
		catch (error) {
			console.error(error);
		}
	},
};