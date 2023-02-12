// Dependancies
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;
const config = require('./config.json');
const token = config.token;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions ],
	partials: [User, Message, GuildMember, ThreadMember, Reaction, Channel] });
const commands = [];
client.commands = new Collection();

// Finds all commands
const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
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

// Starts bot
client.login(token);