module.exports = {
  name: 'messageReactionAdd',
  once: false,
  async execute(reaction, user) {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;
    if (reaction.message.channel.id == channel) {
      if (reaction.emoji.name === students379Emoji) {
        await reaction.message.guild.members.cache.get(user.id).roles.add(students379);
      }
      if (reaction.emoji.name === students325Emoji) {
        await reaction.message.guild.members.cache.get(user.id).add(students325);
      }
      if (reaction.emoji.name === students314Emoji) {
        await reaction.message.guild.members.cache.get(user.id).add(students314);
      }
    }
/*
    const channel = '1070552148183629976' //PASTE YOUR CHANNEL ID HERE
    const { message } = reaction;
    const { guild } = message;

    if (!guild || message.channel.id !== channel) return;
    const students379Emoji = ':one:';
    const students325Emoji = ':two:';
    const students314Emoji = ':three:';

    const member = guild.members.cache.get(user.id);
    const students379 = guild.roles.cache.find((role) => role.name === '379 Students');
    const students325 = guild.roles.cache.find((role) => role.name === '325 Students');
    const students314 = guild.roles.cache.find((role) => role.name === '314 Students');
*/

  }
}
