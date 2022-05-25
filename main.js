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
    new Meteoro(50,0,100,0.5),
    new Meteoro(250,0,50, 0.8),
    new Meteoro(550,-200,50, 0.8),
    new Meteoro(450,0,190, 0.2),
]

let game = {
    ativo: true
}

//gameLopp => coração do Jogo
function gameLopp() {
    if(!game.ativo) return
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

        //chocar com play

        if(meteoro.posicaoNaTela.y + meteoro.altura >= player.pTela.y &&
            meteoro.posicaoNaTela.x + meteoro.largura >= player.pTela.x && 
            meteoro.posicaoNaTela.x <= player.pTela.x + player.largura &&
            meteoro.posicaoNaTela.y <= player.pTela.y + player.altura){
                console.log("perdeu");
                player.intacto = false;

                setTimeout(() =>{
                    game.ativo = false;
                },2000)
                
        }
    });
}

// controlar os frames

setInterval(gameLopp, 1000 / 60);