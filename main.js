import Player from './scr/Player.js';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = innerWidth; //500
canvas.height = innerHeight; //600

// criar os objetos para acena

const player = new Player(100,200);

//gameLopp => coração do Jogo

function gameLopp() {


    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw(c);


}

// controlar os frames

setInterval(gameLopp, 1000 / 60);