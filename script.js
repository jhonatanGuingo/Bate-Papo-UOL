let names = {};

axios.defaults.headers.common['Authorization'] = 'IuHZ6BMFfr0J3l7LdoeG2XVV';

function entrouNaSala() {
let nomeDigitado = prompt("Qual o seu nome?");
 let novoUsuario = {
    name: nomeDigitado
 }
 const promiseLogin = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoUsuario);
 promiseLogin.then(recebeu);
 promiseLogin.catch(deuErro);
}

entrouNaSala();

function recebeu(resposta){   
    console.log(`O nome foi salvo com sucesso`);
    console.log(resposta);
}

function deuErro(erro){
    console.log(`ocorreu algum problema ao tentar salvar o nome`);
    console.log(erro);
}