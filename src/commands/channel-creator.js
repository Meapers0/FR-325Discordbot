const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('channel-creator')
		.setDescription('Creates a hidden channel into a existing or new category.')
        .addStringOption(option => option
            .setName('channel-name')
            .setDescription('Name the channel.')
            .setRequired(true),
            )
        .addStringOption(option => option
            .setName('existing-category')
            .setDescription('If you want the channel to be made in an existing category.')
            .setRequired(false),
            )
        .addStringOption(option => option
            .setName('new-category')
            .setDescription('If you want the channel to be made in a new category.')
            .setRequired(false),
            )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const existingCategory = interaction.options.getString('existing-category');
        const newCategory = interaction.options.getString('new-category');
        // const existingCategory = interaction.guild.channels.cache.find(category => category.name == interaction.options.data[1].value);
        console.log(existingCategory);
        console.log(newCategory);
        if ((existingCategory === null) && (newCategory === null)) {
            interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
                ],
            });
        }
        else if ((existingCategory != null) && (newCategory === null)) {
            const temp = interaction.guild.channels.cache.find(category => category.name === existingCategory);
            await interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
                parent: temp,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
                ],
        });
        }
        else if ((existingCategory === null) && (newCategory != null)) {
            const temp = await interaction.guild.channels.create({
                name: interaction.options.data[1].value,
                type: ChannelType.GuildCategory,
            });
            await interaction.guild.channels.create({
                name: interaction.options.data[0].value,
                type: ChannelType.GuildText,
                parent: temp,
				permissionOverwrites: [
					{
					id: interaction.guild.id,
					deny: [PermissionFlagsBits.ViewChannel],
					},
                ],
        });
        }
        else {
            interaction.reply('Cannot have all options selected!');
            return;
        }
        interaction.reply('Channel has been created.');
    },
};