const { EmbedBuilder,Partials, resolveColor, Client, Collection, GatewayIntentBits, ActivityType,OAuth2Scopes } = require("discord.js");
const conf = require("./config")
const db = require("quick.db");
const client = global.client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent],
    scopes:[
    OAuth2Scopes.Bot,
    OAuth2Scopes.ApplicationsCommands
  ],partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent
  ],
    presence: {
      activities: [{
        name: conf.botDurum,
        type: ActivityType.Streaming,
        url: "https://www.youtube.com/watch?v=qmpzPtaa3vc"
      }],
    }
  });
const { readdir } = require("fs");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdir("./src/commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let prop = require(`./src/commands/${f}/` + file);
                console.log(`🧮 [KOMUT!] Başarıyla ${prop.name} Komutu Yüklendi!`);
                commands.set(prop.name, prop);
                prop.aliases.forEach(alias => { aliases.set(alias, prop.name); });
            });
        });
    });
});


readdir("./src/events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let prop = require(`./src/events/${file}`);
        if (!prop.conf) return;
        client.on(prop.conf.name, prop);
        console.log(`📚 [EVENT!] Başarıyla ${prop.conf.name} Eventi Yüklendi!`);
    });
});


Collection.prototype.array = function () { return [...this.values()] }

const {emitWarning} = process;
process.emitWarning = (warning, ...args) => {
if (args[0] === 'ExperimentalWarning') {return;}
if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {return;}
return emitWarning(warning, ...args);
};

Promise.prototype.sil = function (time) {
if (this) this.then(s => {
      if (s.deletable) {
        setTimeout(async () => {
          s.delete().catch(e => { });
        }, time * 1000)
      }
    });
  };


client.login(conf.token).then(() => 
console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)
).catch((err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${err}`));


// Örnek Olarak İndex E Eklemek İsterseniz Aşadaki Kodu Kullanabilirsiniz
// Aşağıdaki Koda Dokunma Botun İçerisinde Eventslerde Tag Sistem Var
/*
client.on('userUpdate',async (oldU,newU)=>{
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
  })
  */