let listaDeNumerosSorteados = [];
let numeroLimite = 3;
let titulo = document.querySelector('h1');
let paragrafo = document.querySelector('p');
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

titulo.innerHTML = 'Jogo do Número Secreto';
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';


function exibirTextoNaTela(tag, texto){
    let campo  = document.querySelector(tag);
    campo.innerHTML = texto;
    //reponsiveVoice.speak(texto, 'Brasilian Portuguese Female', {rate: 1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;
        if(chute == numeroSecreto){
            let qtdTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você Descobriu com ${tentativas} ${qtdTentativas}`;
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', mensagemTentativas);
            document.getElementById('reiniciar').removeAttribute('disabled');

        } else if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O numero é menor.');
            }else{
                exibirTextoNaTela('p', 'O numero é maior.');
                limparCampo();
            }
            tentativas++
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ' ';

}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function gerarNumeroAleatorio(){
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido
    }
}