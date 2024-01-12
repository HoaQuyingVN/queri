const Voice = require('@discordjs/voice');
const { PartyState } = require('./lib/state');
class Party extends PartyState {
  /*
   * @param {PartyState} state
   * @extends PartyState
   */
  constructor({client, max_age, media_client}){
    super({client, max_age, media_client});
    this.state = 'READY_FOR_AVS';
    this.voice_channel = null;
    this.voice_connection = null;
    this.audio_player = null; 
    this.audio_resource = null;
    this.audio_player_subscription = "NONE"; // Audio player subscription is a promise that resolves when the audio player has started playing.
    this.opus = require('@discordjs/opus'); // Opus is a library that allows you to play audio in voice channels using the Discord API, keep in mind that this library is not the same as the Discord.js library.
    this.ffmpeg = require('ffmpeg-static'); // FFmpeg is a library that allows you to convert audio files to a format that can be played in voice channels using the Discord API.
    
  }
  async join(channel){
    if(this.voice_connection){
message.reply(`I'm already in a voice channel!`);
console.log(`[${this.client.user.username}] Already connected to a voice channel, Party.js will not join the channel again.`);
    }
    this.voice_channel = channel;
    this.voice_connection = Voice.joinVoiceChannel({
      channelId: this.voice_channel.id,
      guildId: this.voice_channel.guild.id,
      adapterCreator: this.voice_channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false
    
});
    message.reply(`${this.client.user.username} has joined the voice channel ${this.voice_channel.name}, and your party is ready to go!`);
    this.state = `CONNECTED_$${this.voice_channel.id}`;
  }
  async leave(){
    if(this.voice_connection){
      this.voice_connection.destroy();
      this.voice_connection = null;
      this.voice_channel = null;
      this.state = 'READY_FOR_AVS';
      message.reply(`${this.client.user.username} has left the voice channel ${this.voice_channel.name}, Partie(s) in your party has been stopped.`);
    }
  }
  async play(audio_file){
    if(this.voice_connection){
      if(this.audio_player){
        this.audio_player.stop();
        this.audio_player = null;
      }
      this.audio_resource = Voice.createAudioResource(audio_file, {
        inputType: Voice.StreamType.Arbitrary,
        inlineVolume: true
      });
      this.audio_player = Voice.createAudioPlayer();
      this.audio_player.play(this.audio_resource);
      this.audio_player_subscription = this.audio_player.subscribe(this.voice_connection);
      message.reply(`${this.client.user.username} is now playing!`);
    }
  message.reply(`${this.client.user.username} is not in a voice channel, please use the join command to join a voice channel.`);
  }
  async stop(){
    if(this.voice_connection){
      if(this.audio_player){
        this.audio_player.stop();
        this.audio_player = null;
        this.audio_resource = null;
        this.audio_player_subscription = "NONE";
        message.reply(`${this.client.user.username} has stopped playing!`);
      }
      }
    message.reply(`${this.client.user.username} is not in a voice channel, please use the join command to join a voice channel.`);
    }
  async react_with_callback (message, callback, timeout = 60000, react){
    const filter = (reaction, user) => {
      return user.id === message.author.id;
  
  };
    const collector = message.createReactionCollector({ filter, time: timeout });
    collector.on('collect', (reaction, user) => {
      callback(reaction, user);
      collector.stop();
      message.reactions.removeAll();
      message.reply(`> ${user.username} has reacted with ${reaction.emoji.name} for ${message.content}`);
      });
    collector.on('end', collected => {
      if (collected.size === 0) {
        message.reply(`> ${message.author.username} has not reacted in time.`);
        }
      if (timeout === 0) {
        message.reply(`> ${message.author.username} has not reacted in time.`);
        }
      


});
    }
  }
module.exports = { Party};