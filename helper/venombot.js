const venom = require('venom-bot');
let qrCodeBase64 = '';
let isUserLoggedIn = false;

exports.initWhatsApp = async function () {
    await connectToWhatsApp();
}

exports.getStatus = async function (req, res) {
    if (!qrCodeBase64) {
        res.json({
            success: false,
            message: 'QR Code not generated yet',
        });
    } else {
        res.send(qrCodeBase64); // Send the base64 QR code string directly
    }
}

exports.getInfoUser = async function (req, res) {
    if (!isUserLoggedIn) {
        res.json({
            success: false,
            message: 'User not logged in',
        });
    } else {
        res.json({
            success: true,
            message: 'User successfully logged in',
        });
    }
}

async function connectToWhatsApp() {
    venom
    .create(
        'jojok',
        (base64Qrimg, asciiQR, attempts, urlCode) => {
            console.log('Number of attempts to read the QR code: ', attempts);
            console.log('base64 image string QR code: ', base64Qrimg);
            qrCodeBase64 = base64Qrimg;
        },
        (statusSession, session) => {
            console.log('Status Session: ', statusSession);
            console.log('Session name: ', session);

            // Check if the status indicates successful chat initiation
            if (statusSession === 'successChat') {
                isUserLoggedIn = true;
            }
        },
        {
            folderNameToken: 'tokens',
            headless: 'new',
        },
    )
    .then((client) => {
        start(client);
    })
    .catch((error) => {
        console.log(error);
    });

    function start(client) {
        client.onMessage((message) => {
            if (message.body === 'Hi' && !message.isGroupMsg) {
                client
                    .sendText(message.from, 'Welcome Venom 🕷')
                    .then((result) => {
                        console.log('Result: ', result);
                    })
                    .catch((error) => {
                        console.error('Error when sending: ', error);
                    });
            }
        });
    }
}
