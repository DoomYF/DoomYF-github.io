const { Client, GatewayIntentBits, Events } = require('discord.js');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Reemplaza esto con tu token de bot de Discord
const DISCORD_BOT_TOKEN = 'TU_TOKEN_DE_BOT';

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

app.use(bodyParser.json());
app.use(express.static('.'));

client.once(Events.ClientReady, () => {
    console.log(`Bot conectado como ${client.user.tag}`);
});

app.post('/send-notification', async (req, res) => {
    const { username, nombre, link, facebookLink, descripcion } = req.body;

    const messageContent = `
**Username:** ${username}
**Nombre:** ${nombre}
**Link:** ${link}
**Link de Facebook:** ${facebookLink}
**Descripción:** ${descripcion}
`;

    // Crea los botones
    const buttonRow = {
        type: 1,
        components: [
            {
                type: 2,
                label: 'Generar Div',
                style: 1,
                customId: 'generate_div',
            },
            {
                type: 2,
                label: 'Borrar Mensaje',
                style: 4,
                customId: 'delete_message',
            },
        ],
    };

    try {
        // Envía un mensaje con botones al canal deseado
        const channel = await client.channels.fetch('ID_DEL_CANAL'); // Cambia por el ID de tu canal
        await channel.send({ content: messageContent, components: [buttonRow] });
        res.status(200).json({ status: 'Notificación enviada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error al enviar notificación' });
    }
});

// Maneja los eventos de interacción
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'generate_div') {
        const divMessage = `<div class="botoncito"><a href="${link}">${nombre}</a></div> <a href="${facebookLink}">link de facebook</a>`;
        await interaction.reply({ content: divMessage, ephemeral: true });
    } else if (interaction.customId === 'delete_message') {
        await interaction.reply({ content: 'Mensaje borrado', ephemeral: true });
        await interaction.message.delete(); // Borra el mensaje original
    }
});

client.login(DISCORD_BOT_TOKEN);

// Inicia el servidor express
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);