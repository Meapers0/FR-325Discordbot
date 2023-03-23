const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-veteran')
        .setDescription('Creates veteran roles for all current student roles')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        try {
            let i = 0;
            let j = 0;
            const fields = [];
            const vetNewArr = [];
            const vetCurArr = [];
            const roles = await interaction.guild.roles.fetch();

            // "creating" the veteran roles
            for (const elem of roles) {
                if (elem[1].name.toLowerCase().includes('student')) {
                    const roleNumArr = elem[1].name.split(' ');
                    vetNewArr[i] = { name: roleNumArr[0] + ' Veteran', color: elem[1].color };
                    i++;
                }
                else if (elem[1].name.toLowerCase().includes('veteran')) {
                    vetCurArr[j] = elem[1].name;
                    j++;
                }
            }
            console.log(vetCurArr);
            console.log(vetNewArr);
            for (let k = 0; k < vetNewArr.length; k++) {
                for (let h = 0; h < vetCurArr.length; h++) {
                    if (vetNewArr[k].name === vetCurArr[h]) {
                        console.log('Duplicate found');
                        vetNewArr[k] = ' ';
                    }
                }
            }
            console.log(vetNewArr);
            i = 0;
            vetNewArr.forEach(async elem => {
                if (elem != ' ') {
                    await interaction.guild.roles.create({
                        name: elem.name,
                        color: elem.color,
                        reason: 'Role created via create-veteran command',
                        hoist: true,
                    });
                    fields[i] = { name: elem.name, value: 'Created' };
                    i++;
                }
            },
            );
            interaction.reply('Veteran roles have been created');
        }
        catch (error) {
            console.error(error);
        }
    },

};