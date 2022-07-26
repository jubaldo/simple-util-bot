const { Client, GatewayIntentBits } = require("discord.js");
const deploy_commands = require("./deploy-commands")
const { writeFile } = require("fs/promises");
//how to ensure we have the right permissions and scope: https://github.com/discordjs/discord.js/issues/6288#issuecomment-955388767
const client = new Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds] });


client.once("ready", async () => {

});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName, guildId } = interaction;
	if (commandName === 'member-list') {
       
        await interaction.reply('Commencing download of csv');
        let guild_info =  await client.guilds.fetch(guildId);
        let members_list = await guild_info.members.fetch();
        // console.log("Heere is the member list: ", members_list)
        if(members_list) {
            let csv_results = [];
            csv_results.push(["id", "username", "nickname", "joinedAt", "joinedTimestamp", "roles"])
            members_list.forEach(member => {
            //    console.log("Here is a member: ", member.displayName);
               let id = member.user.id;
               let user_name = member.user.tag;
               let nickname = member.nickname;
               let joined_at = member.joinedAt;
               let joined_ts = member.joinedTimestamp;
               let roles_list = [];
               member.roles.cache.forEach(role => {
                   roles_list.push(role.name);
               });

               let roles = roles_list.join(", ");
               csv_results.push([id, user_name, nickname, joined_at, joined_ts, roles]);
            });

            const header = csv_results[0].join(",");
            const values = csv_results.slice(1)
              .map((data) => data.join(","))
              .join("\n");
            const now_date = new Date();
            let time_stamp_str = now_date.getTime().toString();
            let guild_name = guild_info.name
            console.log(time_stamp_str);
      
            return writeFile(`./csv_files/${time_stamp_str}_${guild_name}.csv`, `${header}\n${values}`);
        }
	}
});

client.login(deploy_commands.token);