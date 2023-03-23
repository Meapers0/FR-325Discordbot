const votedMembers = new Set();

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand() || !interaction.isStringSelectMenu() || !interaction.isContextMenu() || !interaction.isButton()) {
            console.log(`Command Interaction ran. "${interaction.commandName}"`);
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
            }
            if (interaction.isCommand()) {
                try {
                    await command.execute(interaction);
                }
                catch (error) {
                    console.error(`Error executing ${interaction.commandName}`);
                    console.error(error);
                }
            }
        }
        if (interaction.isStringSelectMenu()) {
            const component = interaction.component;
            const removed = component.options.filter((option) => {
                return !interaction.values.includes(option.value);
            });
            for (const id of removed) {
                await interaction.member.roles.remove(id.value);
            }
            for (const id of interaction.values) {
                await interaction.member.roles.add(id);
            }
            await interaction.deferReply({ ephemeral: true });
            await interaction.editReply({ content: 'Your role has been updated', ephemeral: true });
        }
        if (interaction.isButton()) {
            const splittedArray = interaction.customId.split('-');
            if (splittedArray[0] !== 'Poll') return;

            if (votedMembers.has(`${interaction.user.id}-${interaction.message.id}`)) {
                return interaction.reply({ content: 'You already voted.', ephemeral: true });
            }
            votedMembers.add(`${interaction.user.id}-${interaction.message.id}`);
            const pollEmbed = interaction.message.embeds[0];
            if (!pollEmbed) {
                return interaction.reply({
                content: 'unable to find poll',
                ephemeral: true,
            });
            }

            const yesField = pollEmbed.fields[0];
            const noField = pollEmbed.fields[1];

            const VoteCountedReply = 'Vote Counted.';

            switch (splittedArray[1]) {
                case 'Yes': {
                    const newYesCount = parseInt(yesField.value) + 1;
                    yesField.value = newYesCount;

                    interaction.reply({ content: VoteCountedReply, ephemeral: true });
                    interaction.message.edit({ embeds: [pollEmbed] });
                }
                    break;
                case 'No': {
                    const newNoCount = parseInt(noField.value) + 1;
                    noField.value = newNoCount;

                    interaction.reply({ content: VoteCountedReply, ephemeral: true });
                    interaction.message.edit({ embeds: [pollEmbed] });
                }
                    break;
            }
        }
    },
};