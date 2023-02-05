const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const token = config.token;
const mongoose = require("mongoose");

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

const commands = [];

client.commands = new Collection();

const commandsPath = path.join(__dirname, '/src/commands')
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
        client.once(event.name, (...args) => event.execute(...args, commands))
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

//mongoDB connection
const connect = {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	//useCreateIndex: true,
  };
mongoose.connect(config.mongodbUrl, connect
).then(() => {
	console.log('Connected to the database');
}).catch((err) =>{
	console.log(err);
});
	
client.login(token);