import Player from './Player.js';
import ControleMeteoros from './ControleMeteoros.js';
import ControleProjeteis from './ControleProjeteis.js';
import Terra from './Terra.js';

//capiturar a area de redenização do jogo
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

//definir o tamanho da tela
canvas.width = 1200;
canvas.height = 650;

const background = new Image();
background.src = './src/imgs/fundo.png'
const faixaImpacto = new Image();
faixaImpacto.src = './src/imgs/faixaImpacto.png';

// criar os objetos para acena
const controleProjetil = new ControleProjeteis();
const player = new Player(canvas, controleProjetil);
const controleMeteoro = [];
const terra = new Terra(canvas);

//Algumas variáveis
let frames = 0;// condição para a repliação dos meteoros
let intervaloTempo = 1000;//Math.floor(Math.random() * 500)
let inicioDoJogo = false; //atraso na inicialização
const populacaoEl = document.querySelector('#populacao');
const scoreEl = document.querySelector('#score');
let score = 0;
let evo = 0;
let contPopulacao = 8000000000;
populacaoEl.innerHTML = contPopulacao;

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
    c.drawImage(faixaImpacto, 0, 645, canvas.width, 5);
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
            controle.listaMeteoros.forEach((meteoro) => {
                colisaoMeteoro(controle, meteoro);
                colisaoPlayer(controle, meteoro);
                colisaoTerra(controle, meteoro);
            })
        })

        evolucaoPlayer();
    }

    if (frames % intervaloTempo === 0) {
        controleMeteoro.push(new ControleMeteoros());
        if (intervaloTempo >= 500) {
            intervaloTempo -= 50
        }
    }
    frames++
}

function colisaoPlayer(controle, meteoro) {
    if (meteoro.aCPosY + meteoro.aCAltura >= player.pTelaY &&
        meteoro.aCPosX + meteoro.aCLargura >= player.pTelaX &&
        meteoro.aCPosY <= player.pTelaY + player.altura &&
        meteoro.aCPosX <= player.pTelaX + player.largura && player.intacto) {
        //console.log("perdeu");

        const pesoMeteoro = meteoro.peso;
        meteoro.peso -= player.energia;
        player.energia -= pesoMeteoro;

        if (meteoro.peso <= 0) {
            const index = controle.listaMeteoros.indexOf(meteoro);
            controle.listaMeteoros.splice(index, 1);
        }
        if (player.energia <= 0) {

            player.intacto = false;

            subPopulacao(1);

            setTimeout(() => {
                game.ativo = false;
            }, 2000)
        }
        player.somExplosao.currentTime = 0;
        player.somExplosao.play();
    }
}

function colisaoMeteoro(controle, meteoro) {
    //colisão com meteoro ou se ele sair da tela
    if (controleProjetil.colisao(meteoro)) {

        somarScore();

        if (meteoro.peso <= 0) {
            const index = controle.listaMeteoros.indexOf(meteoro);
            controle.listaMeteoros.splice(index, 1);

            //som de explosão do meteoro
            meteoro.somExplosao.currentTime = 0;
            meteoro.somExplosao.play();
        }else if(meteoro.pTelaY > canvas.height){
            const index = controle.listaMeteoros.indexOf(meteoro);
            controle.listaMeteoros.splice(index, 1);
        }

    } else {
        meteoro.draw(c);
    }
}

function caixa(c, cor, x, y, largura, altura) {

    c.strokeStyle = cor
    c.stroke();
    c.strokeRect(x, y, largura, altura)
}
function colisaoTerra(controle, meteoro) {
    const x = 200;
    const y = 640;
    const largura = 800;
    const altura = 10;

    //caixa(c, 'blue', x,y, largura, altura); 

    if (meteoro.aCPosY + meteoro.aCAltura >= y &&
        meteoro.aCPosX + meteoro.aCLargura >= x &&
        meteoro.aCPosY <= y + altura &&
        meteoro.aCPosX <= x + largura) {

        if (meteoro.peso <= 100) {
            console.log('destruição local');
            subPopulacao(1000);
        } else if (meteoro.peso > 100 && meteoro.peso <= 150) {
            console.log('extinsão parcial n1');
            subPopulacao(10000);
        } else if (meteoro.peso > 150 && meteoro.peso <= 200) {
            console.log('extinsão parcial n2');
            subPopulacao(100000);
        } else if (meteoro.peso > 200 && meteoro.peso <= 250) {
            console.log('extinsão parcial n3');
            subPopulacao(10000000);
        } else if (meteoro.peso > 250 && meteoro.peso <= 300) {
            console.log('extinsão total');
            subPopulacao(7999999999);
        }

        const index = controle.listaMeteoros.indexOf(meteoro);
        controle.listaMeteoros.splice(index, 1);
       

       
    }
}
function subPopulacao(valor) {
    if (contPopulacao >= 0) {
        contPopulacao -= valor;
        if (contPopulacao < 0 && player.intacto) {
            contPopulacao = 1;
        }
    }
    populacaoEl.innerHTML = contPopulacao;
}
function somarScore(){
    score += 10;
    scoreEl.innerHTML = score;
    evo += 10;
}

function evolucaoPlayer(){
    if(evo ===1000){
        player.energia += 100;
        player.dano += 5
        evo = 0;

        console.log("Player evoluio")
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