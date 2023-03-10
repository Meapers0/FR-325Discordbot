module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction) {
        if (!interaction.isStringSelectMenu()) {
        console.log(`Command Interaction ran. "${interaction.commandName}"`);
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

            // for (const id of interaction.guild.members.cache.entries()) {
            //     console.log(id[1].roles);
            // }

            await interaction.update({ content: 'Your role has been updated', ephemeral: true });
        }
    },
};