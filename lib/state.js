class PartyState {
  // Extends PartyState
  constructor(){
    this.client = require('discord').Client;
    this.max_age = null;
    this.media_client = null;
    this.voice_channel = null;
    this.voice_connection = null;
    this.audio_player = null;
    this.audio_resource = null;
    this.audio_player_subscription = "NONE";
    this.opus = require('@discordjs/opus');
    this.ffmpeg = require('ffmpeg-static');
    this.coffeescript = require('typescript');
    
  }
  async client_media(media_source){
    if(!media_source){
      throw new MediaServiceError(`The media source of the client is not defined, please define the media source of the client.(Supported Typescript Source)`)
    }
    if(media_source.includes('ts')){
      this.media_client = this.coffeescript.compile(media_source);
    }
    else{
      throw new MediaServiceError(`The media source of the client is not supported, please define the media source of the client.(Supported TypeScript Source)`)
    }
    
  }
}
module.exports = {PartyState};