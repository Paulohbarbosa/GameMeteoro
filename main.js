import Player from './src/Player.js';
import Meteoro from './src/Meteoro.js';
import ControleProjeteis from './src/ControleProjeteis.js';

//capiturar a area de redenização do jogo
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = innerWidth; //550
canvas.height = innerHeight; //600

// criar os objetos para acena
    //Contorle de Bala
const controleProjetil = new ControleProjeteis();

    //player
const player = new Player(canvas, controleProjetil);

    //meteoro
//const meteoro = new Meteoro(50, 50, 100,200);
//const meteoro = new Meteoro();

    //vários meteoros
const meteoros = [
    new Meteoro(50,50,100),
    new Meteoro(150,250,90),
    new Meteoro(250,50,190),
]

//gameLopp => coração do Jogo

function gameLopp() {

    //estilo do plano de fundo do game
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

    //desenhar o player
    player.draw(c);
    
    //bala
    controleProjetil.draw(c);

    //desenhar o meteoro
    //meteoro.draw(c);

    //para vários meteoros
    
    meteoros.forEach((meteoro)=>{
        //colisão com meteoro
        if (controleProjetil.colisao(meteoro)){
            if(meteoro.peso <= 0){
                const index = meteoros.indexOf(meteoro);
                meteoros.splice(index, 1);
            }
        }else{meteoro.draw(c)}
    });
}

// controlar os frames

setInterval(gameLopp, 1000 / 60);