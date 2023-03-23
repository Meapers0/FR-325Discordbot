const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('promote')
		.setDescription('Adds veteran role and removes student role for all members'),
    async execute(interaction) {
        const members = await interaction.guild.members.fetch();
        const roles = await interaction.guild.roles.fetch();
        await interaction.deferReply({ ephemeral: true });
        for (const elem of members) {
            elem[1].roles.cache.forEach(async element => {
                if (element.name.toLowerCase().includes('student')) {
                    const stuRoleNum = element.name.split(' ');
                    for (const role of roles) {
                        if (role[1].name.toLowerCase().includes('veteran')) {
                        const vetRoleNum = role[1].name.split(' ');
                            if (vetRoleNum[0] === stuRoleNum[0]) {
                                await elem[1].roles.add(role[1]);
                            }
                        }
                        else if (role[1].name.toLowerCase().includes('student')) {
                            await elem[1].roles.remove(role[1]);
                        }
                }
            }
        });
        }
        await interaction.editReply({ content: 'All students have been move to their veteran role' });
    },
};