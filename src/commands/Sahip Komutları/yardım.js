const {PermissionFlagsBits} = require("discord.js");
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

    let commandsFive = client.commands.filter(bes => bes.usage).map((fivesobes) => `> \`${config.prefix}${fivesobes.usage}\``).join("\n");

     message.reply({ embeds: [embed.setDescription(`${commandsFive}`).setThumbnail(message.guild.iconURL({dynamic:true})).setTitle(`Yardım Menüsü`).setURL(`https://linktr.ee/beykant`)] });

    }
}