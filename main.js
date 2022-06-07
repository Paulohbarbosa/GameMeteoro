import Player from './src/Player.js';
import ControleMeteoros from './src/ControleMeteoros.js';
import ControleProjeteis from './src/ControleProjeteis.js';

//capiturar a area de redenização do jogo
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = 1200; //innerWidth
canvas.height = 650; //innerHeight

const background = new Image();
background.src = './src/imgs/fundo2.png'

// criar os objetos para acena
//Contorle de projeteis
const controleProjetil = new ControleProjeteis();

//player
const player = new Player(canvas, controleProjetil);

//Meteoros
const controleMeteoro = [];

//condição para pausar o jogo
let game = {
    ativo: true
}

function colisaoPlayer(meteoro) {
    if (meteoro.pTelaY + meteoro.altura >= player.pTelaY &&
        meteoro.pTelaX + meteoro.largura >= player.pTelax &&
        meteoro.pTelaY <= player.pTelaY + player.altura &&
        meteoro.pTelaX <= player.pTelax + player.largura) {
        console.log("perdeu");

        player.somExplosao.currentTime = 0;
        player.somExplosao.play();

        player.intacto = false;

        setTimeout(() => {
            game.ativo = false;
        }, 50)
    }

}

function colisaoMeteoro(controle, meteoro) {

    //colisão com meteoro ou se ele sair da tela
    if (controleProjetil.colisao(meteoro) || meteoro.pTelaY > canvas.height) {
        if (meteoro.peso <= 0) {
            const index = controle.listaMeteoros.indexOf(meteoro);
            controle.listaMeteoros.splice(index, 1);

            meteoro.somExplosao.currentTime = 0;
            meteoro.somExplosao.play();
        }

    } else {
        meteoro.draw(c);
    }
}

let frames = 0;
let intervaloTempo = 1000;//Math.floor(Math.random() * 500)
console.log(intervaloTempo);

//gameLopp => coração do Jogo
function gameLopp() {

    vocePerdeu();
    if (!game.ativo) return

    //estilo do plano de fundo do game
    c.drawImage(background,0,0,canvas.width,canvas.height);

    //projetil
    controleProjetil.draw(c);

    //desenhar o player
    player.draw(c);

    controleMeteoro.forEach((controle) => {
        controle.update()
        controle.listaMeteoros.forEach((meteoro) => {
            colisaoMeteoro(controle, meteoro);
            colisaoPlayer(meteoro);
        })
    })

    if (frames % intervaloTempo === 0) {
        console.log('tempo: ' + intervaloTempo)
        controleMeteoro.push(new ControleMeteoros());
        if (intervaloTempo >= 500) {
            intervaloTempo -= 50
        }
    }

    frames++
}

function vocePerdeu() {
    if (!game.ativo) {
        let texto = 'Você Perdeu!';

        c.fillStyle = 'white';
        c.font = '70px Arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(texto, canvas.width / 2, canvas.height / 2);
    }
}

// controlar os frames
setInterval(gameLopp, 1000 / 60);