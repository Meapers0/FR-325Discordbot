module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) {
            console.log(`Command Interaction ran. "${interaction.commandName}"`);
        }
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
        }
        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
        /*
        if (!interaction.isStringSelectMenu()) {
            return;
        }
        for (const id of interaction.values) {
            console.log(id);
            console.log(interaction.member.roles[1]);

            await interaction.member.roles.add(id);
        }
        await interaction.update(`${interaction.member}'s Role has been updated`);
        },
        */
    },
};