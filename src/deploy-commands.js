const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');

const token = process.env.TOKEN || "";
const clientId = process.env.APPLICATION_ID || "";
const guildId = process.env.GUILD_ID || "";

const commands = [
	new SlashCommandBuilder().setName('member-list').setDescription('Downloads csv of member list locally where application is running.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(
	Routes.applicationCommands(clientId),
	{ body: commands },
).then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

module.exports = {
    token: token, 
    clienId: clientId,
    guildId: guildId};