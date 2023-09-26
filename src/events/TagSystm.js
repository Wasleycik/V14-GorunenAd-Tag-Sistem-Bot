const { joinVoiceChannel } = require("@discordjs/voice");
const conf = require("../../config");
const Discord = require('discord.js')
const { Events, Client, Partials, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder } = require('discord.js')
const client = global.client;
const db = require("quick.db");
module.exports = async (oldU,newU) => {
    let newMember = newU.displayName
    let oldMember = oldU.displayName
    if (oldMember.bot || newMember.bot || (newMember === oldMember)) return;
    let guild = client.guilds.cache.get(conf.guildID);
    if (!guild) return;
    let member = guild.members.cache.get(oldU.id);
    if (!member) return;
    const tagLog = await guild.channels.cache.get(conf.taglog) || client.channels.cache.find(kanal => kanal.name === config.isimcek.chatchannel)
    if (!tagLog) return;
    const taglirol = conf.ekiprol;
    const tag1 = conf.tag;
    const tag2 = conf.othtag;
    let dev = Object.keys(member.presence.clientStatus)
    let tür = {desktop: "(💻) Bilgisayar / Uygulama",mobile: "(📱) Mobil / Uygulama",web: "(🌐) Web Tarayıcı / İnternet"}
    let tür2 = {online: "(🟢) Çevrimiçi",dnd: "(🔴) Rahatsız Etme",idle: "(🟡) Boşta",offline:"(⚪) Çevrimdışı"}
    if(member.roles.cache.has(taglirol) && !newMember.includes(tag1)){
        await member.setNickname(member.displayName.replace(tag1,tag2));
        await member.roles.remove(taglirol)
        let ekip = guild.roles.cache.get(conf.ekiprol);
        let roles = member.roles.cache.clone().filter(e => e.managed || e.position < ekip.position);
        let roles2 = member.roles.cache.clone().filter(e => e.managed || e.position > ekip.position);
        await member.roles.set(roles).catch();
        const tgsaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("🥺 Tagımızı Saldı!").setStyle(Discord.ButtonStyle.Danger).setCustomId("tagaldiiisdi").setDisabled(true))
const tagkaldirdi = new EmbedBuilder()
.setAuthor({ name: `Tag Sistemi`,iconURL: guild.iconURL({ dynamic: true }) })
.setDescription(`
**${member} Kullanıcısı <t:${(Date.now()/1000).toFixed()}:R> Görünen Adından Tagımızı (\`${tag1}\`) kaldırdı.**
\`\`\`diff
- • Önceki Görünen Adı: ${oldMember} 
+ • Yeni Görünen Adı: ${newMember}
• Sunucudaki Toplam Taglı: ${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(tag1)).size}
\`\`\`
`).addFields(
{name:`**Kullanıcı Hakkında;**`,value:`\`•\` **Kullanıcı:** ${member} - \`(${member.id})\` \n \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R> \n \`•\` **Kullanıcı Durumu:** \`${tür2[member.presence.status]}\` ${dev.map(x => `\`${tür[x]}\``).join("\n")}`,inline:false},
{name:`**Kullanıcıdan Alınan Roller;**`,value:`<@&${taglirol}> ${roles2.map(role => `${role}`).join(', ')}`,inline:false},
).setColor("Red")
if(tagLog) tagLog.send({ embeds: [tagkaldirdi], components : [tgsaldirow]})
}
    if(!member.roles.cache.has(taglirol) && newMember.includes(tag1)){
        await member.setNickname(member.displayName.replace(tag2,tag1));
        await member.roles.add(taglirol)
        const tagaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("🎉 Tagımızı Aldı!").setStyle(Discord.ButtonStyle.Success).setCustomId("tagaldiiii").setDisabled(true))
const tagaldi = new EmbedBuilder()
.setAuthor({ name: `Tag Sistemi`,iconURL: guild.iconURL({ dynamic: true }) })
.setDescription(`
**${member} Kullanıcısı <t:${(Date.now()/1000).toFixed()}:R> Görünen Adına Tagımızı (\`${tag1}\`) aldı.**
\`\`\`diff
- • Önceki Görünen Adı: ${oldMember} 
+ • Yeni Görünen Adı: ${newMember}
• Sunucudaki Toplam Taglı: ${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(tag1)).size}
\`\`\`
`).addFields(
{name:`**Kullanıcı Hakkında;**`,value:`\`•\` **Kullanıcı:** ${member} - \`(${member.id})\` \n \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R> \n \`•\` **Kullanıcı Durumu:** \`${tür2[member.presence.status]}\` ${dev.map(x => `\`${tür[x]}\``).join("\n")}`,inline:false},
{name:`**Kullanıcıya Eklenen Roller;**`,value:`<@&${taglirol}>`,inline:false},
).setColor("Green")
if(tagLog) tagLog.send({ embeds: [tagaldi], components : [tagaldirow]})

}
}
module.exports.conf = {
name: "userUpdate"
}