const { joinVoiceChannel } = require("@discordjs/voice");
const conf = require("../../config");
const client = global.client;
const db = require("quick.db");
module.exports = () => {

    const VoiceChannel = client.channels.cache.get(conf.botseskanal);
    joinVoiceChannel({
        channelId: VoiceChannel.id,
        guildId: VoiceChannel.guild.id,
        adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
        selfDeaf: true
    });
    
    /*
      client.user.setActivity({
        name: conf.botDurum,
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=qmpzPtaa3vc"}); 
*/
}
module.exports.conf = {
name: "ready"
}