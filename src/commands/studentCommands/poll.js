const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll.')
        .setDMPermission(false)
        .addStringOption(options => options
            .setName('question')
            .setDescription('provide the question')
            .setRequired(true),
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
    async execute(interaction) {
        try {
            const pollQuestion = interaction.options.getString('question');
            const pollEmbed = new EmbedBuilder()
                .setDescription('**Question:**\n' + pollQuestion)
                .addFields([
                    { name: 'Yes', value: '0', inline: true },
                    { name: 'No', value: '0', inline: true },
                ])
                .setColor([104, 204, 222]);
            const replyObject = await interaction.reply({ embeds: [pollEmbed], fetchReply: true });
            const pollButtons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('Yes')
                        .setCustomId(`Poll-Yes-${replyObject.id}`)
                        .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                        .setLabel('No')
                        .setCustomId(`Poll-No-${replyObject.id}`)
                        .setStyle(ButtonStyle.Danger),
                );
            interaction.editReply({ components: [pollButtons] });
        }
        catch (error) {
            console.error(error);
        }
    },
};