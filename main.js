import Player from './src/Player.js';
import ControleMeteoros from './src/ControleMeteoros.js';
import ControleProjeteis from './src/ControleProjeteis.js';
import Terra from './src/Terra.js';

//capiturar a area de redenização do jogo
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = 1200;
canvas.height = 650;

const background = new Image();
background.src = './src/imgs/fundo2.png'

// criar os objetos para acena
const controleProjetil = new ControleProjeteis();
const player = new Player(canvas, controleProjetil);
const controleMeteoro = [];
const terra = new Terra(canvas);

//Algumas variáveis
let frames = 0;// condição para a repliação dos meteoros
let intervaloTempo = 1000;//Math.floor(Math.random() * 500)
let inicioDoJogo = false; //atraso na inicialização

//gameLoop => coração do Jogo
function gameLoop() {

    vocePerdeu();
    if (!game.ativo) return

    c.drawImage(background, 0, 0, canvas.width, canvas.height);//estilo do plano de fundo do game

    handlerEvents();
}

//condição para pausar o jogo
let game = {
    ativo: true
}

function handlerEvents() {

    //imagem da terra no inicio 
    terra.draw(c);

    setTimeout(() => {//contrala o tempo para exibir a imagem
        terra.update();//raliza a animação da terra

        setTimeout(() => {//atrasa o inicio do jogo
            inicioDoJogo = true;
        }, 2000)
    }, 2000)

    if (inicioDoJogo) {

        controleProjetil.draw(c);//projetil

        player.draw(c);//desenhar o player

        controleMeteoro.forEach((controle) => {
            controle.update()
            controle.listaMeteoros.forEach((meteoro) => {
                colisaoMeteoro(controle, meteoro);
                colisaoPlayer(meteoro);
            })
        })
    }

    if (frames % intervaloTempo === 0) {
        console.log('tempo: ' + intervaloTempo)
        controleMeteoro.push(new ControleMeteoros());
        if (intervaloTempo >= 500) {
            intervaloTempo -= 50
        }
    }

    frames++
}

function colisaoPlayer(meteoro) {
    if (meteoro.aCPosY + meteoro.aCAltura >= player.pTelaY &&
        meteoro.aCPosX + meteoro.aCLargura >= player.pTelax &&
        meteoro.aCPosY <= player.pTelaY + player.altura &&
        meteoro.aCPosX <= player.pTelax + player.largura) {
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
setInterval(gameLoop, 1000 / 60);