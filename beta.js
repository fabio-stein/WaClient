const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client({
    session: JSON.parse("{\"WABrowserId\":\"\\\"GYf12wuVgWmHj8zYXyb43g==\\\"\",\"WASecretBundle\":\"{\\\"key\\\":\\\"MK78c3q+fyMNbaT7X4qC6KgP4sLtqZVwCbg6eU7hDYY=\\\",\\\"encKey\\\":\\\"lrQfJ3GNtQwRb8bA1oYDIODW5jsouvm1vjWYLPthWfU=\\\",\\\"macKey\\\":\\\"MK78c3q+fyMNbaT7X4qC6KgP4sLtqZVwCbg6eU7hDYY=\\\"}\",\"WAToken1\":\"\\\"SvDoRu\/fpR8Vxxkaif8uGciOTulbaDebbgeBnNDlzaQ=\\\"\",\"WAToken2\":\"\\\"1@AL7Awj0DOzRXwWOtNqJijEuAxkNg7ewkIH+eYi55UwkNXRNtVU9WhecoyPEByLdYEudaiX1BQxIiNg==\\\"\"}")
});

var julia = "5516997732949@c.us";
var rafael = "5511977046656@c.us";
var fabio = "555599436679@c.us";


var owner = "79773439600@c.us";
var user = rafael;

client.on('ready', async () => {
    console.log('Client is ready!');
});

var step = 0;
var option = 0;

client.on('message', message => {
    console.log("["+message.from+"] "+message.body);
    if (message.from == user) {
        switch (step) {
            case 0: {
                client.sendMessage(message.from, FIRST_MESSAGE);
                step = 1;
            }
                break;
            case 1: {
                try {
                    option = Number.parseInt(message.body);
                } catch (e) { }
                if (isNaN(option) || option < 1 || option > 3) {
                    //Invalid
                    client.sendMessage(message.from, FIRST_MESSAGE_INVALID);
                } else {
                    //Valid
                    client.sendMessage(message.from, "Certo, estou encaminhando para o setor responsável...");
                    message.getContact().then(e => {
                        var name = e.pushname;
                        if(name == null){
                            name = e.verifiedName
                        }
                        
                        var desc = "Vendas";
                        if(option == 2){
                            desc = "Suporte";
                        }else if(option == 3){
                            desc = "Financeiro";
                        }
                        client.sendMessage(owner, "Um novo atendimento foi iniciado!\n\nUsuário: *"+name+"*\nDepartamento: *"+desc+"*\n\nResponda nesta conversa e será encaminhado ao usuário.");
                    })
                    step = 2;
                }
                break;
            }
            case 2:{
                client.sendMessage(owner, message.body);
                break;
            }
        }
    }else if(message.from == owner){
        client.sendMessage(user, message.body);
    }
});


client.initialize();

const FIRST_MESSAGE = `Para prosseguir com o atendimento informe o n° referente a uma das opções abaixo:

1 - *Vendas*
2 - *Suporte*
3 - *Financeiro*`;

const FIRST_MESSAGE_INVALID = `Opção inválida, digite uma das opções abaixo:

1 - *Vendas*
2 - *Suporte*
3 - *Financeiro*`;