const { Events, Collection } = require('discord.js');

module.exports = {
    name: Events.GuildRoleCreate,
    once: false,
    async execute(role) {
        console.log(role);
        let positions = [];
        const ids = [];
        let i = 0;
        let map1 = new Collection();
        if (role.name.toLowerCase().includes('student')) {
        const roles = role.guild.roles.cache.entries();
        for (const id of roles) {
            if (id[1].name.toLowerCase().includes('student')) {
            const roleNumArr = id[1].name.split(' ');
            map1.set(roleNumArr[0], { id: id[1].id, position: id[1].position });
            }
        }
        map1 = [...map1.entries()].sort(function(a, b) {
            return a[0] - b[0];
        });
        map1.reverse();
        for (const elem of map1) {
            positions[i] = elem[1].position;
            ids[i] = elem[1].id;
            i++;
        }
        positions = (positions.sort(function(a, b) {
            return a - b;
        })).reverse();
        const posRoles = [];
        for (let j = 0; j < ids.length; j++) {
            posRoles[j] = { role: ids[j], position: positions[j] };
        }
        await role.guild.roles.setPositions(posRoles);
    }
    },
};