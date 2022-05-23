import Player from './src/Player.js';
import Meteoro from './src/Meteoro.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = innerWidth; //500
canvas.height = innerHeight; //600

// criar os objetos para acena
    //player
const player = new Player(canvas.width / 2.1, canvas.height / 1.4);

    //meteoro
const meteoro = new Meteoro(50, 50, 10);




//gameLopp => coração do Jogo

function gameLopp() {

    //estilo do plano de fundo do game
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

    //desenhar o player
    player.draw(c);

    //desenhar o meteoro
    meteoro.draw(c);
}

// controlar os frames

setInterval(gameLopp, 1000 / 60);