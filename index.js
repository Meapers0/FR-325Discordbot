// Dependancies
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials, Events, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ChannelType } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;
const config = require('./config.json');
const token = config.token;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, GuildMessageReactions ],
	partials: [User, Message, GuildMember, ThreadMember, Reaction, Channel] });
const commands = [];
let commandNames = [];
let commandDesc = [];
let i = 0;
client.commands = new Collection();

// Finds all commands
const commandsPath = path.join(__dirname, '/src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
	client.commands.set(command.data.name, command);
	commandNames[i] = { name: `${command.data.name}`, value: `${command.data.description}` };
	i++;
}
console.log(commandNames);
console.log(commandDesc);
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
							value: '1063151758840434758',
						},
						{
							label: 'I also give you a role',
							description: 'This is the 6th choice',
							value: '1073028224898048070',
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


client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'createchannel') {
		console.log(interaction.options.data[0].value);
		if (interaction.options.data[1] === undefined) {
		interaction.guild.channels.create({
			name: interaction.options.data[0].value,
			type: ChannelType.GuildText,
		});
	}

	else {
		const temp = await interaction.guild.channels.create({
				name: interaction.options.data[1].value,
				type: ChannelType.GuildCategory,
			});
		await interaction.guild.channels.create({
			name: interaction.options.data[0].value,
			type: ChannelType.GuildText,
			parent: temp,
		});
		}
		interaction.reply('Channel has been created.');
	}
});


client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'createcategory') {
		console.log(interaction.options.data[0].value);
		interaction.guild.channels.create({
			name: interaction.options.data[0].value,
			type: ChannelType.GuildCategory,
		});
		interaction.reply('Category has been created.');
	}
	});

client.on(Events.InteractionCreate, interaction => {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'help') {
			const embed = new EmbedBuilder()
			.addFields(commandNames);

			interaction.reply({ content: 'Help!', ephemeral: true, embeds: [embed] });
		}
		});

client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.commandName === 'initclass') {
			if (!interaction.options.data[1].value) {
			interaction.guild.channels.create({
				name: `CSC ${interaction.options.data[0].value}`,
				type: ChannelType.GuildCategory,
			});
		}
		else {
			const temp = await interaction.guild.channels.create({
				name: `CSC ${interaction.options.data[0].value}`,
				type: ChannelType.GuildCategory,
			});
			await interaction.guild.channels.create({
				name: `announcements-${interaction.options.data[0].value}`,
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: `zoom-meeting-info-${interaction.options.data[0].value}`,
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: 'introduce-yourself',
				type: ChannelType.GuildText,
				parent: temp,
			});
			await interaction.guild.channels.create({
				name: 'chat',
				type: ChannelType.GuildText,
				parent: temp,
			});
		}

		interaction.reply('Channel has been created');

		}
		});


client.login(token);