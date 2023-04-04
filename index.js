// Dependancies
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;
const config = require('./config.json');
const { checkValid } = require('./src/structures/checkValid');
const token = config.token;


checkValid();

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions ],
	partials: [User, Message, GuildMember, ThreadMember, Reaction, Channel],
});

const commands = [];
client.commandData = [];
client.commandDataStu = [];

client.commands = new Collection();

// Finds all commands and gets names and descriptions
const commandsPath = path.join(__dirname, '/src/commands/modCommands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
	client.commandData.push({ name: `${command.data.name}`, value: `${command.data.description}` });
}

const commandsPath2 = path.join(__dirname, '/src/commands/studentCommands');
const commandFiles2 = fs.readdirSync(commandsPath2).filter(file => file.endsWith('.js'));
for (const file of commandFiles2) {
	const filePath = path.join(commandsPath2, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
	client.commandDataStu.push({ name: `${command.data.name}`, value: `${command.data.description}` });
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
        client.on(event.name, (...args) => event.execute(...args, commands));
	}
}

client.login(token);