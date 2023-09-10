const { Events, Client, Partials, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, EmbedBuilder, ButtonBuilder } = require('discord.js')
const { joinVoiceChannel } = require("@discordjs/voice");
const config = require("../../config");
const Discord = require('discord.js')
const client = global.client;
const db = require("quick.db");
module.exports = async (oldU,newU) => {
    const newMember = newU.displayName
    const oldMember = oldU.displayName
    const guild = client.guilds.cache.get(config.sunucuid);
    const member = guild.members.cache.get(oldU.id);
    const tagLog = await guild.channels.cache.get(config.taglog);
    if ((newMember === oldMember) || oldMember.bot || newMember.bot) return;
    if (!guild || !member || !tagLog) return;
    const taglirol = config.taglirolü;
    const sunucutag = config.tag;
    const tagsiztag = config.tagsiztag;
    const dev = Object.keys(member.presence.clientStatus)
    const tür = {desktop: "(💻) Bilgisayar / Uygulama",mobile: "(📱) Mobil / Uygulama",web: "(🌐) Web Tarayıcı / İnternet"}
    const tür2 = {online: "(🟢) Çevrimiçi",dnd: "(🔴) Rahatsız Etme",idle: "(🟡) Boşta",offline:"(⚪) Çevrimdışı"}
    if(member.roles.cache.has(taglirol)&& !newMember.includes(sunucutag)){
        await member.setNickname(member.displayName.replace(sunucutag,tagsiztag));
        await member.roles.remove(taglirol)
        let ekip = guild.roles.cache.get(taglirol);
        let roles = member.roles.cache.clone().filter(e => e.managed || e.position < ekip.position);
        let roles2 = member.roles.cache.clone().filter(e => e.managed || e.position > ekip.position);
        await member.roles.set(roles).catch();
        const tgsaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("Tagımızı Saldı!").setStyle(Discord.ButtonStyle.Danger).setCustomId("tagaldiiisdi").setDisabled(true))
        const tagkaldirdi = new EmbedBuilder()
                .setAuthor({ name: `Tag System`,iconURL: guild.iconURL({ dynamic: true }) })
                .setDescription(`
                ${member},Kullanıcısı <t:${(Date.now()/1000).toFixed()}:R> Görünen Adından Tagımızı (\`${sunucutag}\`) kaldırdı.
                ▬▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcı Hakkında**)▬▬▬▬▬▬▬▬▬▬▬▬
                \`•\` **Önceki Görünen Adı** \`${oldMember}\` **Yeni Görünen Adı** \`${newMember}\`
                \`•\` **Kullanıcı:** ${member} - \`(${member.id})\`
                \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R>
                \`•\` **Sunucudaki Toplam Taglı:** \`${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(sunucutag)).size}\`
                \`•\` **Giriş Yaptığı Cihaz:** ${dev.map(x => `\`${tür[x]}\``).join("\n")}
                \`•\` **Kullanıcı Durumu:** \`${tür2[member.presence.status]}\`
                ▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcıdan Alınan Roller**)▬▬▬▬▬▬▬▬▬▬▬
                \`•\` **Kullanıcının Üstünden Alınan Roller :**  <@&${taglirol}> ${roles2.map(role => `${role}`).join(', ')}
                `)
                .setColor("Red")
        if(tagLog) tagLog.send({ embeds: [tagkaldirdi], components : [tgsaldirow]})
    }
    if(!member.roles.cache.has(taglirol) && newMember.includes(sunucutag)){
        await member.setNickname(member.displayName.replace(tagsiztag,sunucutag));
        await member.roles.add(taglirol)
        const tagaldirow = new Discord.ActionRowBuilder().addComponents(new Discord.ButtonBuilder().setLabel("Tagımızı Aldı").setStyle(Discord.ButtonStyle.Success).setCustomId("tagaldiiii").setDisabled(true))
        const tagaldi = new EmbedBuilder()
        .setAuthor({ name: `Tag System`,iconURL: guild.iconURL({ dynamic: true }) })
        .setDescription(`${member}  İsimli Üye <t:${(Date.now()/1000).toFixed()}:R> Görünen Adına Tagımızı (\`${sunucutag}\`) aldı.
        ▬▬▬▬▬▬▬▬▬▬▬▬(**Kullanıcı Hakkında**)▬▬▬▬▬▬▬▬▬▬▬▬
        \`•\` **Önceki Görünen Adı** \`${oldMember}\` **Yeni Görünen Adı** \`${newMember}\`
        \`•\` **Kullanıcı:** ${member} - \`(${member.id})\`
        \`•\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(member.joinedAt / 1000)}:R>
        \`•\` **Sunucudaki Toplam Taglı:** \`${guild.members.cache.filter(x=> client.users.cache.get(x.id).displayName.includes(sunucutag)).size}\`
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
