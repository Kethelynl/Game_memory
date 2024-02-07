const bntO = document.querySelector('#btO');
const bntX = document.querySelector('#btX');
const sim = document.querySelector('#sim');
const nao = document.querySelector('#Não');
const btnplay = document.querySelector('#atributo');
const vencer = document.querySelector('.vencer');
const modal = document.querySelector('.modal');
const meiomodal = document.querySelector('.modal-meio');
const finalmodal = document.querySelector('.model-final');
const currentPlayer = document.querySelector('.currentPlayer');
const nameplayer = document.querySelector('.nameplayer');
const placar1 = document.querySelector('.placar1');
const placar2 = document.querySelector('.placar2');
const win = document.querySelector('.win');
const vencefinal = document.querySelector('.vencefinal');
const pontos = document.querySelector('.pontos');
const voltar = document.querySelector('#voltar');


var contX = 0;
var contO = 0;
var player1;
var player2;
var player;
var ambos;
var selected;
var x = 'X';
var o = 'O'
var plc1 = 0;
var plc2 = 0;


var section = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];


function iniciar() {
    document.querySelector('.jogador1').innerHTML = localStorage.getItem('player1');
    document.querySelector('.jogador2').innerHTML = localStorage.getItem('player2');
    document.querySelector('.play').innerHTML = localStorage.getItem('player1');
    placar1.innerHTML = '0'
    placar2.innerHTML = '0'
    localStorage.setItem('ponto1', plc1);
    localStorage.setItem('ponto2', plc2);
   
    meiomodal.style.display ='none';    
    finalmodal.style.display='none';
    
}

function moldeX (){
    contX = contX + 1;
    localStorage.setItem('valor', 'X');
    if(contX > 0){
        document.querySelector('#atributo').disabled = false;
        document.getElementById('btX').disabled = true;
        x = 'btX';
    } if(contO > 0 && contX > 0){
        document.getElementById('btO').disabled = false;
    }  
}
function moldeO (){
    contO = contO + 1;
    localStorage.setItem('valor', 'O');
    if(contO > 0){
        document.querySelector('#atributo').disabled = false;
        document.getElementById('btO').disabled = true;
        o = 'btO';
    } if(contO > 0 && contX > 0){
        document.getElementById('btX').disabled = false;
    }  
}
iniciar()
function play (){
    selected = [];

    player1 = localStorage.getItem('player1');
    player2 = localStorage.getItem('player2');
    player = localStorage.getItem('valor');
    ambos = player1
    currentPlayer.innerHTML = `JOGADOR: ${player}`;
    nameplayer.innerHTML = `${player1}`;

    modal.style.display='none';    

    document.querySelectorAll('.gamer button').forEach((item) => {
        item.innerHTML = '';
        item.addEventListener('click', newmove);
    });
}
var cont = 0;
function newmove(e) {
    if(cont == 0){
        nameplayer.innerHTML = `${player2}`;
        cont = 1;
    }else if(cont == 1){
        nameplayer.innerHTML = `${player1}`;
        cont = 0;
    }
    const index = e.target.getAttribute('data-i');
    e.target.innerHTML = player;
    e.target.removeEventListener('click', newmove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === 'X' ? 'O' : 'X';
    currentPlayer.innerHTML = `JOGADOR: ${player}`;
    ambos = ambos === player1 ? player2: player1;
    nameplayer.innerHTML === `${ambos}`;

}

function check(){
    let ultimojogador = player === 'X' ? 'O' : 'X';
    let namejogador = ambos === player1 ? player2: player1;

    const items = selected
      .map((item, i) => [item, i])
      .filter((item) => item[0] === ultimojogador)
      .map((item,i) => item[1]);

    for(pos of section) {
        if(pos.every((item) => items.includes(item))){
            vencer.innerHTML = namejogador;
            meiomodal.style.display ='flex';   
            sim.addEventListener('click', sim1);
            nao.addEventListener('click', nao1);
            return;
        }
    }
    if(selected.filter((item) => item).length === 9){
        vencer.innerHTML = 'EMPATE!';
        meiomodal.style.display ='flex';   
        play();
        return;
    }
}


function sim1(){
   if(ambos == player2){
    plc1 = plc1 + 1
    localStorage.setItem('ponto1', plc1);
    placar1.innerHTML = localStorage.getItem('ponto1');
   }else if(ambos == player1){
    plc2 = plc2 + 1
    localStorage.setItem('ponto2', plc2);
    placar2.innerHTML = localStorage.getItem('ponto2');
   }
   play();
   meiomodal.style.display ='none';  
   
}
function nao1(){
    finalmodal.style.display='flex';
    if(ambos == player2){
        plc1 = plc1 + 1
        localStorage.setItem('ponto1', plc1);
       }else if(ambos == player1){
        plc2 = plc2 + 1
        localStorage.setItem('ponto2', plc2);
        
       }
    if(plc1 > plc2){
        win.innerHTML = player1 + '!';
        vencefinal.innerHTML = 'O VENCEDOR FOI'
        pontos.innerHTML = 'TOTAL DE PONTOS:' + plc1;
    } else if(plc2 > plc1){
        win.innerHTML = player2  + '!';
        vencefinal.innerHTML = 'O VENCEDOR FOI'
        pontos.innerHTML = 'TOTAL DE PONTOS:' + plc2;
    } else {
        win.innerHTML = 'EMPATE!';
        vencefinal.innerHTML = 'O RESULTADO FOI'
        pontos.innerHTML = 'COM UM TOTAL DE:' +  plc2;
    }
}

function voltou(){
    window.location = '../index.html';
}

bntO.addEventListener('click', moldeO);
bntX.addEventListener('click', moldeX);
btnplay.addEventListener('click', play);
voltar.addEventListener('click', voltou);