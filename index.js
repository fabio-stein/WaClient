const qrcode = require('qrcode-terminal');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const { Client } = require('whatsapp-web.js');
const client = new Client({
    session: JSON.parse("{\"WABrowserId\":\"\\\"GYf12wuVgWmHj8zYXyb43g==\\\"\",\"WASecretBundle\":\"{\\\"key\\\":\\\"MK78c3q+fyMNbaT7X4qC6KgP4sLtqZVwCbg6eU7hDYY=\\\",\\\"encKey\\\":\\\"lrQfJ3GNtQwRb8bA1oYDIODW5jsouvm1vjWYLPthWfU=\\\",\\\"macKey\\\":\\\"MK78c3q+fyMNbaT7X4qC6KgP4sLtqZVwCbg6eU7hDYY=\\\"}\",\"WAToken1\":\"\\\"SvDoRu\/fpR8Vxxkaif8uGciOTulbaDebbgeBnNDlzaQ=\\\"\",\"WAToken2\":\"\\\"1@AL7Awj0DOzRXwWOtNqJijEuAxkNg7ewkIH+eYi55UwkNXRNtVU9WhecoyPEByLdYEudaiX1BQxIiNg==\\\"\"}")
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

function ask() {
    rl.question(':', (answer) => {
        client.sendMessage("555599436679@c.us", answer);
        ask();
    });
}

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong');
        console.log(message.from)
    }
    client.sendMessage("555599436679@c.us", "test");
});

client.initialize();

ask();