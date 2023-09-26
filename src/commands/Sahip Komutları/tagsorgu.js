const {PermissionsBitField} = require("discord.js");
const config = require("../../../config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "tagsorgu",
    usage:"tagsorgu",
    aliases: ["tagbilgi","tagara"],
    execute: async (client, message, args, embed) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.channel.send({ content: "Yeterli yetkin bulunmuyor!" }).then((e) => setTimeout(() => { e.delete(); }, 5000));
            return    
        }
        const tags = args.slice(0).join(" ")
        if(!tags) return message.reply("Bir Tag Belirt!")
        const sonuc = message.guild.members.cache.filter(t => t.user.displayName.includes(cst)).size
        const sonuc2 = message.guild.members.cache.filter(t => t.user.displayName.includes(cst)).map(t => t).join('--')
        
        message.reply("Belirtilen Taga Sahip Bu Sunucuda `"+sonuc+"` Kişi Var!")
         message.channel.send(`**Tagdaki Üyeler** ; \n${sonuc2 || "Kimse yok"}`)  
    }
}