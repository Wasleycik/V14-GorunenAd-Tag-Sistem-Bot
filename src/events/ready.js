const config = require("../../config");
const client = global.client;
const { ActivityType } = require("discord.js");
module.exports = () => {
  const getType = (type) => {
    switch (type) {
      case "COMPETING":
        return ActivityType.Competing;

      case "LISTENING":
        return ActivityType.Listening;

      case "PLAYING":
        return ActivityType.Playing;

      case "WATCHING":
        return ActivityType.Watching;

      case "STREAMING":
        return ActivityType.Streaming;
    }
  };
/*
setInterval(async () => {
    const voice = require("@discordjs/voice")
    const channel = client.channels.cache.get(config.BotSesKanal);
    voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
        selfMute: true,
        selfDeaf: true
    });
}, 1000 * 3)
*/
setInterval(async () => {
    client.user.setPresence({
      status: config.Presence.Status || "online",
      activities: [
        {
          name: config.Presence.Message[Math.floor(Math.random() * config.Presence.Message.length)] || "Wasley Was Here? ❤️",
          type: getType(config.Presence.Type || "STREAMING"),
          url: "https://www.youtube.com/watch?v=qmpzPtaa3vc"
        },
      ],
    });
  }, 10000);

}
module.exports.conf = {
name: "ready"
}