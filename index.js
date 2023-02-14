const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, Events, StringSelectMenuBuilder, RoleSelectMenuBuilder, EmbedBuilder, GuildMemberRoleManager, Guild, GuildMember } = require('discord.js');
const config = require('./config.json');
const token = config.token;



const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]});

const commands = [];

client.commands = new Collection();

const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, '/src/events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventsFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    }
	else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'roles') {
		const row = new ActionRowBuilder()
			.addComponents(
				new StringSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(2)
					.addOptions(
						{
							label: 'I give you a role',
							description: 'This is a description',
							value: '1071638283894935672',
						},
						{
							label: 'I also give you a role',
							description: 'This is the 6th choice',
							value: '1071638312374255667',
						},
						{
							label: 'This role here',
							description: 'Adds a role',
							value: '1071638382536556585',
						},
					),
			);

			const embed = new EmbedBuilder()
						.setColor(0x0099FF)
						.setTitle('Works with embeds')
						.setDescription('Add a role for the classes you are in!');

		await interaction.reply({ content: 'Pong!', ephemeral: false, embeds: [embed], components: [row] });
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;

	let roles = interaction.member.roles;

	for (const roleId of interaction.member.roles) {
		roles = roleId.id;
	}

	for (const id of interaction.values) {
		console.log(id);
		console.log(interaction.member.roles[1]);
		if (id === interaction.member.roles[0]) {
			await interaction.member.roles.remove(id);
		}
		await interaction.member.roles.add(id);
	}
	await interaction.update(`${interaction.member}'s Role has been updated`);
});


client.login(token);