module.exports = {
    name: 'selectMenuRole',
    once: false,
    async execute(interaction) {
	if (!interaction.isStringSelectMenu()) return;
	for (const id of interaction.values) {
		console.log(id);
		console.log(interaction.member.roles[1]);
		if (id === interaction.member.roles[0]) {
			await interaction.member.roles.remove(id);
		}
		await interaction.guild.roles.add(id);
	}
	await interaction.update(`${interaction.member}'s Role has been updated`);
},
};