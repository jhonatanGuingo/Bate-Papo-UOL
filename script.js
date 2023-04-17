let novoUsuario;
let objeto;
let nomeDigitado;

axios.defaults.headers.common['Authorization'] = 'IuHZ6BMFfr0J3l7LdoeG2XVV';

function entrouNaSala() {
nomeDigitado = prompt("Qual o seu nome?");
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
    window.location.reload()
}

setInterval(conexaoServer, 5000);

function srcMessage (){
    let promiseMessage = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseMessage.then(renderMessage);
}

setInterval(srcMessage, 3000);
function renderMessage(messages){
    let screen = document.querySelector(".bate-papo");
    screen.innerHTML = "";

    for (let i = 0; i < messages.data.length; i++){
        if (messages.data[i].type === 'status'){
        screen.innerHTML += `<div class="${messages.data[i].type}" data-test="message">
        <a><a class = "hour">(${messages.data[i].time}) </a> 
        <span class = "bold"> ${messages.data[i].from} </span>
        ${messages.data[i].text}</a>
        </div>`;
        }else if (messages.data[i].type === 'message'){
            screen.innerHTML +=   `<div class="${messages.data[i].type}" data-test="message">
            <span class="hour">(${messages.data[i].time})</span> 
            <span class="bold">${messages.data[i].from}</span>
            <span class="text">para&nbsp;</span>
            <span class="bold">${messages.data[i].to}:</span>
            <span class="text">${messages.data[i].text}</span>
        </div>`;
        }else {
            screen.innerHTML +=  `<div class="${messages.data[i].type}" data-test="message">
            <span class="hour">(${messages.data[i].time})</span> 
            <span class="bold">${messages.data[i].from}</span>
            <span class="text">reservadamente&nbsp;</span>
            <span class="bold">${messages.data[i].to}:</span>
            <span class="text">${messages.data[i].text}</span>
        </div>`;

        }
    }

    const elements = document.querySelector(".bate-papo").lastChild;
    elements.scrollIntoView();
}



function sendMessage(){
    let enviar = document.querySelector(".chat").value;

    objeto = {
        from: nomeDigitado,
        to: "Todos",
        text: enviar,
        type: "message"
    }

    let promiseNewMessage = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', objeto);
    promiseNewMessage.then();
    promiseNewMessage.catch();
    document.querySelector(".chat").value = "";
    srcMessage ();
}

