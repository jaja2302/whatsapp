const express = require('express');
const { getStatus, initWhatsApp, getInfoUser } = require('./helper/venombot');

const port = 3000;
const app = express();

let qrCodeBase64 = ''; // Variable to store the QR code

app.get('/showQRCode', (req, res) => {
    if (!qrCodeBase64) {
        res.json({
            success: false,
            message: 'QR Code not generated yet',
        });
    } else {
        res.send(`<img src="data:image/png;base64, ${qrCodeBase64}" alt="QR Code"/>`);
    }
});

app.get('/generateQRCode', async (req, res) => {
    // Logic to generate QR code (assuming asynchronous generation)
    try {
        // Generate QR code...
        qrCodeBase64 = 'base64QRCodeString'; // Update qrCodeBase64 with the generated code
        res.json({
            success: true,
            message: 'QR Code generated successfully',
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to generate QR Code',
        });
    }
});

app.get('/userStatus', getInfoUser);

app.get('/', getStatus); // You can keep this route for additional functionalities

app.listen(port, async function () {
    console.log(`Server running on port ${port}`);
    await initWhatsApp();
});
