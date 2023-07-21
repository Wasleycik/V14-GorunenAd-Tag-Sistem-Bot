const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "uptime",
    usage:"uptime",
    aliases: ["uptime"],
    execute: async (client, message, args, embed) => {

    message.reply({ embeds: [new EmbedBuilder().setDescription(`**Bot \`${moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]')}\` Beri Aktif**`)] });


     },
  };