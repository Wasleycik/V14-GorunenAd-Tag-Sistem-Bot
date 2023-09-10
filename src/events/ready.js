const { joinVoiceChannel } = require("@discordjs/voice");
const config = require("../../config");
const client = global.client;
const db = require("quick.db");
module.exports = () => {

    const VoiceChannel = client.channels.cache.get(config.botseskanal);
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

setInterval(() => { TagAlıncaİsimKontrol(); }, 30 * 1000);
setInterval(() => { TagSalıncaİsimKontrol(); }, 35 * 1000);
setInterval(() => { TagAlıncaKontrol(); }, 20 * 1000);
setInterval(() => { TagBırakanKontrol(); }, 25 * 1000);

async function TagAlıncaİsimKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(config.sunucuid)
const members = [...guild.members.cache.filter(member => member.user.displayName.includes(config.tag) && member.user.displayName.includes(config.tagsiztag)).values()].splice(0, 10)
for await (const member of members) {
await member.setNickname(member.displayName.replace(config.tagsiztag, config.tag))
}
};

async function TagSalıncaİsimKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(config.sunucuid)
const members = [...guild.members.cache.filter(member => !member.user.displayName.includes(config.tag) && member.displayName.includes(config.tag)).values()].splice(0, 10)
for await (const member of members) {
await member.setNickname(member.displayName.replace(config.tag, config.tagsiztag))
}
};

async function TagAlıncaKontrol() { // Tag alınca tarama
const guild = client.guilds.cache.get(config.sunucuid)
const members = [...guild.members.cache.filter(member => member.user.displayName.includes(config.tag) && !member.roles.cache.has(sunucuayar.jailRole) && !member.roles.cache.has(config.taglirolü)).values()].splice(0, 10)
for await (const member of members) {
if (config.taglirolü) await member.roles.add(config.taglirolü);
}
};

async function TagBırakanKontrol() { // Tagı olmayanın family rol çekme
const guild = client.guilds.cache.get(config.sunucuid)
const memberss = [...guild.members.cache.filter(member => !member.user.displayName.includes(config.tag) && member.roles.cache.has(config.taglirolü)).values()].splice(0, 10)
for await (const member of memberss) {
if (config.taglirolü) {
await member.roles.remove(config.taglirolü);
}
}
};

}
module.exports.conf = {
name: "ready"
}
