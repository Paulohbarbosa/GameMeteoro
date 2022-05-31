import Player from './src/Player.js';
import Meteoro from './src/Meteoro.js';
import ControleProjeteis from './src/ControleProjeteis.js';
import Particulas from './src/Particulas.js';

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

//Particulas
const particulas = [];

//vários meteoros
const meteoros = [
    new Meteoro(50, 0, 100, 0.5),
    new Meteoro(250, 0, 50, 0.8),
    new Meteoro(550, -200, 50, 0.8),
    new Meteoro(450, 0, 190, 0.2),
]

//função explosão que usa a classe particulas
function explosao({ objeto, cor, trasparencia }) {
    for (let i = 0; i < 20; i++) {
        particulas.push(
            new Particulas({
                posicao: {
                    x: objeto.posicaoNaTela.x + objeto.largura / 2,
                    y: objeto.posicaoNaTela.y + objeto.largura / 2
                },
                velocidade: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 0.5) * 2,
                },
                raio: Math.random() * 3,
                cor: cor,
                trasparencia
            })
        )
    }
}

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

//gameLopp => coração do Jogo
function gameLopp() {
    if (!game.ativo) return
    //estilo do plano de fundo do game
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height);

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

    //projetil
    controleProjetil.draw(c);

    //para vários meteoros
    meteoros.forEach((meteoro) => {
        //colisão com meteoro
        if (controleProjetil.colisao(meteoro)) {
            if (meteoro.peso <= 0) {
                const index = meteoros.indexOf(meteoro);
                meteoros.splice(index, 1);
                //explosão
                explosao({
                    objeto: meteoro,
                    cor: 'yellow',
                    trasparencia: true
                })
            }
            
        } else { 
            meteoro.draw(c);
        }

        //colisão com play
        if (meteoro.posicaoNaTela.y + meteoro.altura >= player.posicaoNaTela.y &&
            meteoro.posicaoNaTela.x + meteoro.largura >= player.posicaoNaTela.x &&
            meteoro.posicaoNaTela.x <= player.posicaoNaTela.x + player.largura &&
            meteoro.posicaoNaTela.y <= player.posicaoNaTela.y + player.altura) {
            console.log("perdeu");
            player.intacto = false;
            //explosão
            explosao({
                objeto: player,
                cor: 'white',
                trasparencia: true
            })
            setTimeout(() => {
                game.ativo = false;
            }, 2000)
        }
    });
}

// controlar os frames
setInterval(gameLopp, 1000 / 60);