const {PermissionsBitField} = require("discord.js");
const config = require("../../../config")
const client = global.client;
const db = client.db;
module.exports = {
    name: "yardım",
    usage:"yardım",
    aliases: ["help","yardm","helps"],
    execute: async (client, message, args, embed) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.channel.send({ content: "Yeterli yetkin bulunmuyor!" }).then((e) => setTimeout(() => { e.delete(); }, 5000));
            return    
        }

    let komutlarr = client.commands.filter(t => t.usage).map((cmd) => `> \`${config.prefix}${cmd.usage}\``).join("\n");

     message.reply({ embeds: [embed.setAuthor({ name: `Yardım Menüsü`,iconURL: message.guild.iconURL({ dynamic: true }) }).setDescription(`${komutlarr}`)] });

    }
}