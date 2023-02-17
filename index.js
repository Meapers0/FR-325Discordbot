// Dependancies
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, Events } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;
const config = require('./config.json');
const token = config.token;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions ],
	partials: [User, Message, GuildMember, ThreadMember, Reaction, Channel] });

const commands = [];
client.commandData = [];

client.commands = new Collection();

// Finds all commands and gets names and descriptions
let i = 0;
const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
	client.commandData[i] = { name: `${command.data.name}`, value: `${command.data.description}` };
	i++;
}

// Finds all events
const eventsPath = path.join(__dirname, '/src/events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventsFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, commands));
    }
	else {
        client.once(event.name, (...args) => event.execute(...args, commands));
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isStringSelectMenu()) return;
	const component = interaction.component;
	const removed = component.options.filter((option) => {
		console.log(!interaction.values.includes(option.values));
	});

	for (const id of removed) {
		console.log(id);
		await interaction.member.roles.remove(id);
	}

	for (const id of interaction.values) {
		console.log(id);
		console.log(interaction.member.roles[1]);
		await interaction.member.roles.add(id);
	}
	await interaction.update(`${interaction.member}'s Role has been updated`);

});




client.login(token);