const { ApplicationCommandOptionType,PermissionsBitField,EmbedBuilder } = require("discord.js");
const conf = require("../../../config")

module.exports = {
    name: "tagdağıt",
    usage:"tagdağıt",
    aliases: ["tagdağıt","tagroldağıt"],
    execute: async (client, message, args, embed) => {

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.channel.send({ content: "Yeterli yetkin bulunmuyor!" }).then((e) => setTimeout(() => { e.delete(); }, 5000));
            return    
        }
        let tag = conf.tag;
        let tagrol = conf.taglirolü;

let taglılar = message.guild.members.cache.filter(s => s.user.displayName.includes(tag) && !s.roles.cache.has(tagrol))
let tagsızlar = message.guild.members.cache.filter(s => !s.user.displayName.includes(tag) && s.roles.cache.has(tagrol))

taglılar.map(async tags => {
await tags.roles.add(tagrol)
})

tagsızlar.map(async tags => {
await tags.roles.remove(tagrol)
})

return message.channel.send(`**${taglılar.size}** Kullanıcıya taglı rolü verilecek.\n**${tagsızlar.size}** Kullanıcıdan taglı rolü alınacak.`)

}
}
