const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Brings up role select menu')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    async execute(interaction) {
        let tempRole = [];
        let i = 0;
        await interaction.guild.roles.cache.forEach(element => {
            if (element.name.toLowerCase().includes('student')) {
            tempRole[i] = {
				label: `${element.name}`,
                description: `This applies the ${element.name} role`,
                value: `${element.id}`,
				};
                i++;
            }
        },
        );
        tempRole = tempRole.sort((a, b) => {
            const labelA = a.label;
            const labelB = b.label;
            if (labelA < labelB) {
                return -1;
            }
            if (labelA > labelB) {
                return 1;
            }
            return 0;
        });
        tempRole.reverse();

        const row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .setMinValues(1)
                .setMaxValues(i)
                .addOptions(tempRole),
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Please select the classes you are taking for the current semester!')
            .addFields(
                { name: 'Adding a role', value: 'Simply click to add a role (you can add more than one!)' },
                { name: 'Removing a role', value: 'The bot will remove all roles that you did not select.' },
            );
        await interaction.reply({ ephemeral: false, embeds: [embed], components: [row] });
    },
};