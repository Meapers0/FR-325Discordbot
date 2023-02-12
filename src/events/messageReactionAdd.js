module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(messageReaction, user) {
    const students379 = messageReaction.message.guild.roles.cache.find(role => role.name === '379Students');
    const students325 = messageReaction.message.guild.roles.cache.find(role => role.name === '325Students');
    const students314 = messageReaction.message.guild.roles.cache.find(role => role.name === '314Students');
    const students379Emoji = '1️⃣';
    const students325Emoji = '2️⃣';
    const students314Emoji = '3️⃣';
      if (messageReaction.message.partial) await messageReaction.message.fetch();
      if (messageReaction.partial) await messageReaction.fetch();
      if (user.bot) return;
      if (!messageReaction.message.guild) return;
      if (messageReaction.message.channel.id == '1070552148183629976') {
        if (messageReaction.emoji.name === students379Emoji) {
          await messageReaction.message.guild.members.cache.get(user.id).roles.add(students379);
        }
        if (messageReaction.emoji.name === students325Emoji) {
          await messageReaction.message.guild.members.cache.get(user.id).roles.add(students325);
        }
        if (messageReaction.emoji.name === students314Emoji) {
          await messageReaction.message.guild.members.cache.get(user.id).roles.add(students314);
        }
      }
    },
};