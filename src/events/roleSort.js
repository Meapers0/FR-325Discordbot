const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role) {
        const roleArr = [];
        const posArr = [];
        const finalArr = [];
        let i = 0;
        if (role.name.toLowerCase().includes('student') || role.name.toLowerCase().includes('veteran')) {
        const roles = role.guild.roles.cache.entries();
        for (const id of roles) {
            if (id[1].name.toLowerCase().includes('student')) {
            const roleNumArr = id[1].name.split(' ');
            roleArr[i] = { number: roleNumArr[0], id: id[1].id, position: id[1].position, sub: 'Student' };
            posArr[i] = id[1].position;
            i++;
            }
            else if (id[1].name.toLowerCase().includes('veteran')) {
            const roleNumArr = id[1].name.split(' ');
            roleArr[i] = { number: roleNumArr[0], id: id[1].id, position: id[1].position, sub: 'Veteran' };
            posArr[i] = id[1].position;
            i++;
            }
        }

        const priority = {
            Student: 1,
            Veteran: 2,
        };

        roleArr.sort((a, b) => {
            return priority[a.sub] - priority[b.sub] ||
                b.number - a.number;
        });


        posArr.sort((a, b) => {
            return b - a;
        });

        for (let j = 0; j < roleArr.length; j++) {
            finalArr[j] = { role: roleArr[j].id, position: posArr[j] };
        }

        try {
         await role.guild.roles.setPositions(finalArr);
        }
        catch (error) {
            console.error(error);
        }
   }
   },
 };