const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../../config.json');

module.exports = {
    name: "ready",
    once: true,
    execute(client, commands) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        const rest = new REST({ version: '10' }).setToken(token);

        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: commands },
                );
                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            }
            catch (error) {
                console.error(error);
            }
        })();
    },
};