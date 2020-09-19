const fetch = require('node-fetch');
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
    fetch("https://rebot.me/pt/ask", {
        "headers": {
            "accept": "*/*",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-csrf-token": "x9ENTxBwKTA6doXpJBUpOpmIGS9KvJQmLzknhGAa",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_ga=GA1.2.1712323570.1599871911; _gid=GA1.2.1814854408.1599871911; laravel_session=eyJpdiI6Ik91QTJ4dzVoT29zQTZyNElGRXh5MlE9PSIsInZhbHVlIjoiXC94blgwRjVMUFIrVWlWM3p2S2tOMVlTdnEzYnRUeVNoNDF1dm02R0hqUVpZdVJvbm0xSmlQbmhPcWF3MERhRm1cL1o3MkU3b25mTVlmaU5oUDBxT1wvM3c9PSIsIm1hYyI6IjNlNjA4YmE0Yjc2NzJiMWEzMjdkZjE5ZjkwNzIxNTI3NTcwNTNkZTY2OTFkYmM1NjM4NmVmNzUyZGQxMjE4ODMifQ%3D%3D"
        },
        "referrer": "https://rebot.me/pt/simsimi-br-1",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": "username=simsimi-br-1&question=" + message.body,
        "method": "POST",
        "mode": "cors"
    })
        .then(res => res.text())
        .then(res => {
            console.log(res)
            client.sendMessage(message.from, res);
        })
});

client.initialize();

ask();