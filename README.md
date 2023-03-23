# 325Discordbot - Private repo for Team 3

## Dependencies

We use a linter, please run
`npm install --save-dev eslint`
to make use of it.

You can also install
`npm install nodemon`
and then
`npm run start:dev`
for easier testing of the bot.

## config.json
This bot uses a config.json file. Place this in the root of the directory.
Current the structure of that file is...

```
{
    "token" : "YOUR TOKEN HERE",
    "clientId" : "YOUR CLIENTID HERE",
    "guildId" : "YOUR GUILDID HERE"
}
```
## Structure of the bot

This bot deploys its commands inside of ready.js, no need for running another file before launching the bot.
Inside the SRC folder, you can find the commands, event listeners, and structures (*not yet in use*).

## Current commands of the bot:

- `channel-creator` This generates a channel inside or outside an existing or new category based on the commands subcommands.
- `create-role` This creates a role with subcommands that allow the user to create.
a role based on what subcommands they choose. If student is chosen it will ask for the course prefix + number. The other subcommand
asks for what the role should be named. Generates the role with a random color.
- `create-veteran` This creates a veteran role if `student` is found within the guild's roles. Ex: `375 Students` -> `375 Veteran`. The previous command `create-role` suggests you run `create-veteran`.
- `delete-roles` This is a helpful testing command, won't be included in final.
- `help` Lists all available commands and their descriptions.
- `init-course` This generates a category using a course number and creates four sub channels. This also has two subcommands to ask if the course is cohabited (requires two roles) or if it is singular (requires one role).
- `ping` Replies with pong.
- `poll` Makes a poll with only `Yes` or `No` as options to answer the poll. The question can be written.
- `promote` This finds every guild member who has a role which contains `students` and if it contains `students` the role is removed and the matching `veteran` role is added.
- `prune` removes messages 1 to 99.
- `roles` This is a drop down select menu which allows students to select what course they are in. Roles can be removed by changing what you selected. It is required to select at least ONE role.


### These are commands that are up for change

- none.

# Comparison to previous progress reports

## From progress report 1 to 2

Comparing to our first progress report we have started using event handlers to listen for events.
As a result, we no longer depend on deploy-commands.js and this is handled through
ready.js in the events folder. 

The commands that we had in Progress Report 1

- `avatar` this gets the @'d users avatar
- `banner` this gets the @'d users banner
- `kick` this kicks the @'d user
- `options-info` echos back text entered
- `ping` replies with pong
- `server` provides info about the server
- `user` provides info about the @'d user

We have since added the following commands since Progress Report 1

- `reaction-role` generates a reaction role message, which only works in a specified channel.
- `roles` generates a menu select for roles
- `category-create` this generates a category based on what the user enters
- `channel-create` this generates a channel based on what the user enters
- `help` lists all available commands and their descriptions
- `initclass` this generates a category using a course number and four sub channels.

Since Progress Report 1 we have also added permissions to our commands. This is handled using the
`.setDefaultMemberPermissions(PermissionFlagsBits.[PERMISSION]),` where permission allows the user
with that permission to use the command.

## From progress report 2 to 3

Comparing to our second progress report we have added more functionality to several commands and removed reduant or uneeded commands.
We've also added the functionality of our bot to automatically sort roles whenever a role is created with `roleSort.js`

The commands that we had in Progress report 2.

- `avatar` this gets the @'d users avatar
- `banner` this gets the @'d users banner
- `category-create` this generates a category based on what the user enters
- `channel-create` this generates a channel based on what the user enters
- `help` lists all available commands and their descriptions
- `initclass` this generates a category using a course number and four sub channels
- `kick` this kicks the @'d user
- `options-info` echos back text entered
- `ping` replies with pong
- `prune` removes messages 1 to 99
- `server` provides info about the server
- `user` provides info about the @'d user

We have since added or removed (ones with strike through are removed) the following commands since Progress Report 2. 

- ~~/avatar~~ 
- ~~/banner~~ 
- These two commands were removed and merged into one another to create `/channel-creator`
    - ~~/category-create~~
    - ~~/channel-create~~
- `create-role`
- `create-veteran`
- ###### `delete-roles` (strictly a test command)
- `init-course` This was a rename of `initclass`
- ~~kick~~
- ~~options-info~~
- `poll`
- `promote`
- `prune`
- `roles`
- ~~server~~
- ~~user~~