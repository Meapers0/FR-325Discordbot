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
    "token" : "YOUR TOKEN HERE",
    "clientId" : "YOUR CLIENTID HERE",
    "guildId" : "YOUR GUILDID HERE",
```
## Structure of the bot
This bot deploys its commands inside of ready.js, no need for running another file before launching the bot.
Inside the SRC folder, you can find the commands, event listeners, and structures (*not yet in use*).

## Current commands of the bot:

- **/avatar** this gets the @'d users avatar
- **/banner** this gets the @'d users banner
- **/category-create** this generates a category based on what the user enters
- **/channel-create** this generates a channel based on what the user enters
- **/help** lists all available commands and their descriptions
- **/initclass** this generates a category using a course number and four sub channels
- **/kick** this kicks the @'d user
- **/options-info** echos back text entered
- **/ping** replies with pong
- **/prune** removes messages 1 to 99
- **/server** provides info about the server
- **/user** provides info about the @'d user

### These are commands that are up for change

- **/reaction-role** generates a reaction role message, which only works in a specified channel.
- **/role-sort** Doesn't do anything at the moment of PR2
- **/roles** generates a menu select for roles

## Comparison to previous progress report
Comparing to our first progress report we have started using event handlers to listen for events.
As a result, we no longer depend on deploy-commands.js and this is handled through
ready.js in the events folder. 

The commands that we had in Progress Report 1

- **/avatar** this gets the @'d users avatar
- **/banner** this gets the @'d users banner
- **/kick** this kicks the @'d user
- **/options-info** echos back text entered
- **/ping** replies with pong
- **/server** provides info about the server
- **/user** provides info about the @'d user

We have since added the following commands since Progress Report 1

- **/reaction-role** generates a reaction role message, which only works in a specified channel.
- **/roles** generates a menu select for roles
- **/category-create** this generates a category based on what the user enters
- **/channel-create** this generates a channel based on what the user enters
- **/help** lists all available commands and their descriptions
- **/initclass** this generates a category using a course number and four sub channels

Since Progress Report 1 we have also added permissions to our commands. This is handled using the
`.setDefaultMemberPermissions(PermissionFlagsBits.[PERMISSION]),` where permission allows the user
with that permission to use the command.