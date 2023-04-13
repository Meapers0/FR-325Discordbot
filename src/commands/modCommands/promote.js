const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('promote')
        .setDescription('Adds veteran role and removes student role for all members')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        // confirmation
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
            content: `${interaction.user}, please enter 'yes' or 'no' to exectue/cancel the command (10 seconds to respond)`,
            ephemeral: true,
        });

        const filter = m =>
            (m.content.toLowerCase() === 'yes' ||
            m.content.toLowerCase() === 'no') &&
            m.author.id === interaction.user.id;

        const collector = interaction.channel.createMessageCollector({ filter,
            max: 1,
            time: 10000 });

        collector.on('collect', m => {
            m.delete();
            collector.stop();
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                interaction.followUp({
                    content: 'You timed out',
                    ephemeral: true,
                });
                return;
            }
            if (collected.first().content === 'no') {
                    interaction.followUp({
                    content: 'Aborting',
                    ephemeral: true,
                });
                return;
            }
            if (collected.first().content === 'yes') {
                await interaction.editReply('Command will process.');
                // actual command
                const members = await interaction.guild.members.fetch();
                const roles = await interaction.guild.roles.fetch();
                const rolesToAdd = [];
                for (const elem of members) {
                    elem[1].roles.cache.forEach(async element => {
                        const rolesToRemove = [];
                        let j = 0;
                        if (element.name.toLowerCase().includes('student')) {
                            const stuRoleNum = element.name.split(' ');
                            for (const role of roles) {
                                if (role[1].name.toLowerCase().includes('veteran')) {
                                    const vetRoleNum = role[1].name.split(' ');
                                    if (vetRoleNum[0] === stuRoleNum[0]) {
                                        rolesToAdd.push(role[1]);
                                    }
                                }
                                else if (role[1].name.toLowerCase().includes('student')) {
                                    rolesToRemove[j] = role[1];
                                    j++;
                                }
                            }
                            await elem[1].roles.add(rolesToAdd);
                            await elem[1].roles.remove(rolesToRemove);
                        }
                    });
                }
            }
            await interaction.followUp({
                content: 'All students have been moved to their veteran role',
                ephemeral: true,
            });
        });
    },
};