const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Reemplaza esto con tu token de bot de Discord y canal ID
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1330256028041744448/D02Kbz-Ppk4ZOFLEwjQsXlXs9_-hETvUn7BQ-awC4Y4OG__n8VRGthcOgnjzmYwrHZpz';

app.use(bodyParser.json());
app.use(express.static('.')); // Sirve archivos estáticos (como index.html)

app.post('/send-notification', async (req, res) => {
    const { username, nombre, link, facebookLink, descripcion } = req.body;

    const message = `
**Username:** ${username}
**Nombre:** ${nombre}
**Link:** ${link}
**Link de Facebook:** ${facebookLink}
**Descripción:** ${descripcion}
`;

    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: message,
        });
        res.status(200).json({ status: 'Notificación enviada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Error al enviar notificación' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});