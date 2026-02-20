const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = "4973";

client.once("ready", () => {
  console.log(`Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.content === "!servers") {
    try {
      const response = await axios.get(
        "https://games.roblox.com/v1/games/2753915549/servers/Public?limit=100"
      );

      const servers = response.data.data
        .filter((s) => s.playing < s.maxPlayers)
        .sort((a, b) => a.playing - b.playing)
        .slice(0, 5);

      let msg = "**Servidores com menos players:**\n\n";

      servers.forEach((server) => {
        msg += `👥 ${server.playing}/${server.maxPlayers}\n`;
        msg += `ID: ${server.id}\n\n`;
      });

      message.channel.send(msg);
    } catch (err) {
      message.channel.send("Erro ao buscar servidores.");
    }
  }
});

client.login(TOKEN);
