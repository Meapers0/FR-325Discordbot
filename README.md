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
- **/roles** generates a menu select for roles

## Comparison to previous progress report
