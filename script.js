let novoUsuario;

axios.defaults.headers.common['Authorization'] = 'IuHZ6BMFfr0J3l7LdoeG2XVV';

function entrouNaSala() {
let nomeDigitado = prompt("Qual o seu nome?");
novoUsuario = {
    name: nomeDigitado
 };
 const promiseLogin = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoUsuario);
 promiseLogin.then(recebeu(promiseLogin));
 promiseLogin.catch(deuErro);
}

entrouNaSala();

function recebeu(resposta){   
    
    console.log(resposta);
}

function deuErro(erro){
    console.log(`Já tem um usuario com esse nome!`);
    console.log(erro);
    entrouNaSala();
}

function conexaoServer(){
    let promiseConection = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', novoUsuario);
    promiseConection.then(recebeu);
    promiseConection.catch(offline);
}

function offline(){
    console.log('Usuario saiu da sala');
}

setInterval(conexaoServer, 5000);

function srcMessage (){
    let promiseMessage = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseMessage.then(renderMessage);
}

function renderMessage(messages){
    let screen = document.querySelector(".bate-papo");
    screen.innerHTML = "";

    for (let i = 0; i < messages.data.length; i++){
        screen.innerHTML += `<div class="${messages.data[i].type}">
        <a><a class = "hour">(${messages.data[i].time}) </a> 
        <span class = "bold"> ${messages.data[i].from} </span>
        ${messages.data[i].text}</a>
        </div>`;
    }

    const elements = document.querySelector(`.bate-papo`).lastChild;
    elements.scrollIntoView();
}

setInterval(srcMessage, 3000);

function sendMessage(message){
    let sendMessage = document.querySelector("input").value;

    let obj = {
        from: novoUsuario,
        to: "todos",
        text: sendMessage,
        type: "message"
    }

    let promiseNewMessage = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', obj);
    promiseNewMessage.then(msgSended);
    promiseNewMessage.catch();
    document.querySelector("input").value = "";
}

function msgSended(){
    let screen = document.querySelector(".bate-papo");
    screen.innerHTML += `<div class="${obj.data.type}">
    <a><span class = "negrito"> ${obj.data.from} </span>${obj.data.text}</a>
</div>`;
}