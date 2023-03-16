const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-role')
		.setDescription('Creates a new role')
        .addSubcommand(subcommand =>
            subcommand
            .setName('student')
            .setDescription('If the role created is to be a student role')
            .addStringOption(option =>
                option
                .setName('class-number')
                .setDescription('Just enter class number, will give the role default student permissions')
                .setRequired(true),
                )
            .addStringOption(option =>
            option
            .setName('color')
            .setDescription('Enter a color or leave blank for random')
            .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
            .setName('default')
            .setDescription('If the role created is not to be a student role')
            .addStringOption(option =>
                option
                .setName('role-name')
                .setDescription('The name of the role you would like to create')
                .setRequired(true),
                )
            .addStringOption(option =>
            option
            .setName('color')
            .setDescription('Enter a color or leave blank for random')
            .setRequired(false)))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {

        let color = ' ';
        let flag = true;

        const studentRoleName = interaction.options.data[0].options[0].value + ' Student';
        //const veteranRoleName = interaction.options.data[0].options[0].value + ' Veteran';
        const roleName = interaction.options.data[0].options[0].value;
        const roles = await interaction.guild.roles.fetch();

        for (const elem of roles) {
            if (elem[1].name === interaction.options.data[0].options[0].value || elem[1].name === studentRoleName) {
                flag = false;
            }
        }
        console.log(flag);
        if (!interaction.options.data[0].options[1]) {
        color = 'Random';
        }
        else {
        color = interaction.options.data[0].options[1].value;
        }

        if (interaction.options.data[0].name === 'student') {
        interaction.guild.roles.create({
                name: studentRoleName,
                color: color,
                reason: 'Student role created via addrole command',
            });
        // interaction.guild.roles.create({
        //     name: veteranRoleName,
        //     color: color,
        //     reason: 'Veteran created via addrole command',
        // });
        }
        else {
            interaction.guild.roles.create({
                name: interaction.options.data[0].options[0].value,
                color: color,
                reason: 'Role created via addrole command',
            });
        }

        interaction.reply('Role has been created.');
    },
};