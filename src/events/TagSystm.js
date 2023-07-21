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
    const tagLog = await guild.channels.cache.get(conf.taglog);
    if (!tagLog) return;
    const taglirol = conf.ekiprol;
    const tag1 = conf.tag;
    const tag2 = conf.othtag;
    let dev = Object.keys(member.presence.clientStatus)
    let tür = {desktop: "(💻) Bilgisayar / Uygulama",mobile: "(📱) Mobil / Uygulama",web: "(🌐) Web Tarayıcı / İnternet"}
    let tür2 = {online: "(🟢) Çevrimiçi",dnd: "(🔴) Rahatsız Etme",idle: "(🟡) Boşta",offline:"(⚪) Çevrimdışı"}
    if(member.roles.cache.has(taglirol)&& !newMember.includes(tag1)){
        await member.setNickname(member.displayName.replace(tag1,tag2));
        await member.roles.remove(taglirol)
        let ekip = guild.roles.cache.get(conf.ekiprol);
        let roles = member.roles.cache.clone().filter(e => e.managed || e.position < ekip.position);
        let roles2 = member.roles.cache.clone().filter(e => e.managed || e.position > ekip.position);
        await member.roles.set(roles).catch();
        const tgsaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("Tagımızı Saldı!").setStyle(Discord.ButtonStyle.Danger).setCustomId("tagaldiiisdi").setDisabled(true))
        const tagkaldirdi = new EmbedBuilder()
                .setAuthor({ name: `Tag System`,iconURL: guild.iconURL({ dynamic: true }) })
                .setDescription(`
                ${member},Kullanıcısı <t:${(Date.now()/1000).toFixed()}:R> Görünen Adından Tagımızı (\`${tag1}\`) kaldırdı.
                ▬▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcı Hakkında**)▬▬▬▬▬▬▬▬▬▬▬▬
                \`•\` **Önceki Görünen Adı** \`${oldMember}\` **Yeni Görünen Adı** \`${newMember}\`
                \`•\` **Kullanıcı:** ${member} - \`(${member.id})\`
                \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R>
                \`•\` **Sunucudaki Toplam Taglı:** \`${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(tag1)).size}\`
                \`•\` **Giriş Yaptığı Cihaz:** ${dev.map(x => `\`${tür[x]}\``).join("\n")}
                \`•\` **Kullanıcı Durumu:** \`${tür2[member.presence.status]}\`
                ▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcıdan Alınan Roller**)▬▬▬▬▬▬▬▬▬▬▬
                \`•\` **Kullanıcının Üstünden Alınan Roller :**  <@&${taglirol}> ${roles2.map(role => `${role}`).join(', ')}
                `)
                .setColor("Red")
        if(tagLog) tagLog.send({ embeds: [tagkaldirdi], components : [tgsaldirow]})
    }
    if(!member.roles.cache.has(taglirol) && newMember.includes(tag1)){
        await member.setNickname(member.displayName.replace(tag2,tag1));
        await member.roles.add(taglirol)
        const tagaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("Tagımızı Aldı").setStyle(Discord.ButtonStyle.Success).setCustomId("tagaldiiii").setDisabled(true))
        const tagaldi = new EmbedBuilder()
        .setAuthor({ name: `Tag System`,iconURL: guild.iconURL({ dynamic: true }) })
        .setDescription(`${member}  İsimli Üye <t:${(Date.now()/1000).toFixed()}:R> Görünen Adına Tagımızı (\`${tag1}\`) aldı.
        ▬▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcı Hakkında**)▬▬▬▬▬▬▬▬▬▬▬▬
        \`•\` **Önceki Görünen Adı** \`${oldMember}\` **Yeni Görünen Adı** \`${newMember}\`
        \`•\` **Kullanıcı:** ${member} - \`(${member.id})\`
        \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R>
        \`•\` **Sunucudaki Toplam Taglı:** \`${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(tag1)).size}\`
        \`•\` **Giriş Yaptığı Cihaz:** ${dev.map(x => `\`${tür[x]}\``).join("\n")}
        \`•\` **Kullanıcı Durumu:** \`${tür2[member.presence.status]}\`
        ▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcıya Eklenen Roller**)▬▬▬▬▬▬▬▬▬▬▬
        \`•\` **Kullanıcıya Eklenen Roller :** <@&${taglirol}>
        `)
        .setColor("Green")
    if(tagLog) tagLog.send({ embeds: [tagaldi], components : [tagaldirow]})
    }
}
module.exports.conf = {
name: "userUpdate"
}