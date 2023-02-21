module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand() || !interaction.isStringSelectMenu() || !interaction.isContextMenu()) {
            console.log(`Command Interaction ran. "${interaction.commandName}"`);

            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
            }
            if (!interaction.isStringSelectMenu()) {
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
            for (const id of interaction.values) {
                await interaction.member.roles.add(id);
            }
            await interaction.update(`${interaction.member}'s Role has been updated`);
        }
    },
};