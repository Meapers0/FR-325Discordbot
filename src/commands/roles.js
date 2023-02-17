const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Brings up role select menu')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const tempRole = [];
        let i = 0;
        await interaction.guild.roles.cache.forEach(element => {
            if (element.name !== '@everyone') {
            tempRole[i] = {
				label: `${element.name}`,
                description: `This applies the ${element.name} role`,
                value: `${element.id}`,
				};
                i++;
            }
        },
        );
        console.log(tempRole);

        const row = new ActionRowBuilder()
            .addComponents(new StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(tempRole),
            );
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Works with embeds')
            .setDescription('Add a role for the classes you are in!');
        await interaction.reply({ content: 'Pong!', ephemeral: false, embeds: [embed], components: [row] });
    },
};