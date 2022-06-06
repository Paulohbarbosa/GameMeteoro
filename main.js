import Player from './src/Player.js';
import ControleMeteoros from './src/ControleMeteoros.js';
import ControleProjeteis from './src/ControleProjeteis.js';
import Particulas from './src/Particulas.js';


//capiturar a area de redenização do jogo
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = 700; //innerWidth
canvas.height = 600; //innerHeight

// criar os objetos para acena
//Contorle de projeteis
const controleProjetil = new ControleProjeteis();

//player
const player = new Player(canvas, controleProjetil);

//Particulas
const particulas = [];

//Meteoros
const controleMeteoro = [];

function estrelas() {
    for (let i = 0; i < 100; i++) {
        particulas.push(
            new Particulas({
                posicao: {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                },
                velocidade: {
                    x: 0,
                    y: 0.03
                },
                raio: Math.random() * 3,
                cor: 'white'
            })
        )
    }
}

estrelas();

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

        player.intacto = false;

        setTimeout(() => {
            game.ativo = false;
        }, 2000)
    }

}

function colisaoMeteoro(controle, meteoro) {

    //colisão com meteoro ou se ele sair da tela
    if (controleProjetil.colisao(meteoro) || meteoro.pTelaY > canvas.height) {
        if (meteoro.peso <= 0) {
            const index = controle.listaMeteoros.indexOf(meteoro);
            controle.listaMeteoros.splice(index, 1);
        }

    } else {
        meteoro.draw(c);
    }
}

let frames = 0;
let intervaloAleatorio = Math.floor(Math.random() * 500);
console.log(intervaloAleatorio);

//gameLopp => coração do Jogo
function gameLopp() {

    if (!game.ativo) return

    //estilo do plano de fundo do game
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

    //projetil
    controleProjetil.draw(c);

    //desenhar o player
    player.draw(c);

    //desenhar as Particulas
    particulas.forEach((particula, index) => {
        if (particula.posicao.y - particula.raio >= canvas.height) {
            particula.posicao.x = Math.random() * canvas.width,
                particula.posicao.y = -particula.raio
        }
        if (particula.opacidade <= 0) {
            setTimeout(() => {
                particulas.splice(index, 1)
            }, 0)
        } else {
            particula.update(c)
        }
    })

    controleMeteoro.forEach((controle) => {
        controle.update()
        controle.listaMeteoros.forEach((meteoro) => {
            colisaoMeteoro(controle,meteoro);
            colisaoPlayer(meteoro);
        })
    })


    if (frames % intervaloAleatorio === 0) {
        controleMeteoro.push(new ControleMeteoros());
    }

    frames++
}

// controlar os frames
setInterval(gameLopp, 1000 / 60);