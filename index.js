const Discord = require('discord.js');
const Voice = require('@discordjs/voice');
const media_client = "//"
class Party extends Discord.Client {
  constructor(options) {
    super(options);
    this.party = {
      create: async function(channel, options, message){
        if (channel.type !== "GUILD_VOICE") return message.reply("Channel must be a voice channel?, Party.js is need to be in a voice channel");
        if (!channel.permissionsFor(this.user).has("CREATE_INSTANT_INVITE")) return message.reply(`${this.user.username} is missing CREATE_INSTANT_INVITE permission, Please give me this permission to create invite`);
        if (!channel.permissionsFor(this.user).has("CONNECT")) return message.reply(`${this.user.username} wasn't able to connect to the voice channel, Please give me CONNECT permission to connect to the voice channel`);
        if (!channel.permissionsFor(this.user).has("SPEAK")) return message.reply(`${this.user.username} wasn't able to speak in the voice channel, Please give me SPEAK permission to speak in the voice channel`);
        // Sent the invite link to the channel
        const invite = await channel.createInvite(options);
        return message.reply(`Here is your invite link to the party: ${invite.url}\n,`);
        if (options.max_age) {
          return message.reply(`Here is your invite link to the party: ${invite.url}\n, The invite link will expire in ${options.max_age} seconds`);
        }
        // If the media_client is not provided, then it will use the default media client
        if (!options.media_client) {
          return message.reply(`${this.user.username} is missing media_client, That was all party will stop and missing songs, Please check the code and provide the media_client`);
        }
      }
    };
  }
}