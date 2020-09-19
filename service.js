var express = require('express');
var bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');

var app = module.exports = express();
app.use(bodyParser.json());

var client = new Client({ puppeteer: { headless: false } });

let status = {
    initialized: false,
    qr: null,
    session: null,
    ready: false,
    clientInfo: null
}
var messages = [];

function setHandlers() {
    client.on('qr', qr => {
        status.qr = qr;
    });
    client.on('ready', () => {
        status.ready = true;
        status.clientInfo = client.info;
    });
    client.on('authenticated', (session) => {
        status.session = session;
        status.qr = null;
    });
    client.on('message', message => {
        messages.push(message);
    });
}

app.post('/api/initialize', function (req, res, next) {
    var data = req.body;
    if (data.session != null) {
        client = new Client({
            session: data.session,
            puppeteer: { headless: false }
        });
    }
    setHandlers();
    client.initialize();
    res.json(data.session);
});

app.post('/api/sendMessage', async function (req, res, next) {
    var data = req.body;

    res.json(await client.sendMessage(data.user, data.text));
});

app.post('/api/stop', function (req, res, next) {
    res.json({ success: true });
    process.exit();
});

app.get('/api/getMessages', function (req, res, next) {
    res.json(messages);
    messages = [];
});

app.get('/api/status', function (req, res, next) {
    status.counter++;
    res.json(status);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

app.use(function (req, res) {
    res.status(404);
    res.send({ error: "Not found" });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}