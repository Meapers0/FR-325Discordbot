const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roles')
		.setDescription('Brings up role select menu'),
	async execute(interaction) {
		const row = new ActionRowBuilder()
			.addComponents(new StringSelectMenuBuilder()
				.setCustomId('select')
				.setPlaceholder('Nothing selected')
				.setMinValues(1)
				.setMaxValues(2)
				.addOptions(
					{
						label: 'I give you a role',
						description: 'This is a description',
						value: '1071638283894935672',
					},
					{
						label: 'I also give you a role',
						description: 'This is the 6th choice',
						value: '1071638312374255667',
					},
				),
			);
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Works with embeds')
			.setDescription('Add a role for the classes you are in!');
		await interaction.reply({ content: 'Pong!', ephemeral: false, embeds: [embed], components: [row] });
	},
};