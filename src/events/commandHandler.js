const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits, SelectMenuBuilder, ActivityType } = require("discord.js");
const config = require("../../config");
const ms = require('ms');
const db = require("quick.db");
module.exports = async (message) => {
    if (config.prefix && !message.content.startsWith(config.prefix))return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const commands = args.shift().toLowerCase();
    const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
    const embed = new EmbedBuilder()
    .setColor(`#2f3136`)
    .setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })
    .setFooter({ text: config.footer, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 }) })

    if (cmd) {
        cmd.execute(client, message, args, embed);
    }
}

module.exports.conf = { 
name: "messageCreate"
}