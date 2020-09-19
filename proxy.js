const { Client } = require('whatsapp-web.js');
const client = new Client({
    session: JSON.parse("{\"WABrowserId\":\"\\\"R0iydRCk\/K1lWw6OB2xdFg==\\\"\",\"WASecretBundle\":\"{\\\"key\\\":\\\"LCCI2RhKru8vRTWK1IpYC8QeNP5wvKKBktjgh\/pnXUY=\\\",\\\"encKey\\\":\\\"NtAwPpa3pB4QInbuyyePz4J7tN7eB4VSOu7pPuzAHKg=\\\",\\\"macKey\\\":\\\"LCCI2RhKru8vRTWK1IpYC8QeNP5wvKKBktjgh\/pnXUY=\\\"}\",\"WAToken1\":\"\\\"wqknfhC\/sggRIQJ4EHmGeVzv4OGQ1VlPNS67JFjMqEs=\\\"\",\"WAToken2\":\"\\\"1@6Pv5vbYolvdV+B79M5ucj8WHTI2X254m\/mDa6HemGDflyPyFOnWLC+aQQZW6P1WQ7x+Zkt7gxvWq1A==\\\"\"}")
});


client.on('ready', () => {
    console.log('Client is ready!');
});
var rafael = "5511977046656@c.us";
var fabio = "555599436679@c.us";
var julia = "5516997732949@c.us";

var user = rafael;
var app = "12674839369@c.us";
var mine = "79773439600@c.us";

client.on('message', message => {
    console.log("["+message.from+"] "+message.body)
    if (message.from == user) {
        client.sendMessage(app, message.body);
    } else if (message.from == app) {
        client.sendMessage(user, message.body);
    }
});

client.initialize();