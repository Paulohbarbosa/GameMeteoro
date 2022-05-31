export default class Player {
    // matriz com os dados dos recorte das imagens no sprite nave [ix,iy,tx,ty]
    matrizesImgNave = [
        //esquerdo
        [3, 3, 198, 558],
        [204, 3, 134, 558],
        [343, 1, 103, 562],
        [449, 3, 228, 558],
        [681, 3, 351, 558],
        [1037, 10, 371, 558],

        //meio
        [1405, 10, 379, 558],

        //direito
        [1781, 10, 371, 558],
        [2156, 3, 352, 558],
        [2512, 3, 226, 558],
        [2742, 1, 103, 562],
        [2850, 3, 134, 558],
        [2988, 3, 197, 558],
    ]
    constructor(canvas, controleProjeteis) {
        //velocidade
        this.velocidade = 4;

        //canvas
        this.canvas = canvas;

        //condição
        this.intacto = true;

        //tiro
        this.controleProjeteis = controleProjeteis;

        //entradas do tecaldo
        document.addEventListener('keydown', this.teclaPressionada);
        document.addEventListener('keyup', this.teclaSolta);

        //linha e coluna;
        this.linha = 6;

        //imagens
        const image = new Image();
        image.src = './src/imgs/nave.png'
        this.escala = 0.2

        image.onload = () => {

            this.image = image

            this.iRecorte = {
                x: this.matrizesImgNave[this.linha][0],
                y: this.matrizesImgNave[this.linha][1]
            }

            this.tRecorte = {
                x: this.matrizesImgNave[this.linha][2],
                y: this.matrizesImgNave[this.linha][3]
            }

            this.largura = this.tRecorte.x * this.escala;
            this.altura = this.tRecorte.y * this.escala;

            this.posicaoNaTela = {
                x: this.canvas.width / 2 - this.largura / 2,
                y: this.canvas.height - this.altura - 50
            }
        }
    }

    draw(c) {

        //função mover
        this.mover();

        //nave

        if (this.image && this.intacto) {
            c.drawImage(
                this.image,
                this.iRecorte.x,
                this.iRecorte.y,
                this.tRecorte.x,
                this.tRecorte.y,
                this.posicaoNaTela.x,
                this.posicaoNaTela.y,
                this.largura,
                this.altura
            );
        }
        //this.animar(c);

        //tiro
        this.atrirar();
    }

    // atirar
    atrirar() {
        if (this.espacoPressionar) {
            const x = this.posicaoNaTela.x + this.largura / 2;
            const y = this.posicaoNaTela.y;
            const velocidade = 5;
            const atraso = 10;
            const dano = 1;
            this.controleProjeteis.tiro(x, y, velocidade, atraso, dano);
        }
    }

    //mover o objeto
    mover() {
        //if(this.downPressed){this.y += this.velocidade}
        //if(this.upPressed){this.y -= this.velocidade}
        if (this.leftPressed && this.posicaoNaTela.x >= 0) {
            this.posicaoNaTela.x -= this.velocidade;
        } else if (this.rightPressed && this.posicaoNaTela.x + this.largura <= this.canvas.width) {
            this.posicaoNaTela.x += this.velocidade;
        }
    }
    //quando a tecla é pressionada
    teclaPressionada = (e) => {
        // if(e.code === 'ArrowUp'){this.upPressed = true}
        // if(e.code === 'ArrowDown'){this.downPressed = true}
        if (e.code === 'ArrowLeft') { this.leftPressed = true }
        if (e.code === 'ArrowRight') { this.rightPressed = true }
        if (e.code === 'Space') { this.espacoPressionar = true }
    }

    //Quando a tecla é solta 
    teclaSolta = (e) => {
        //if(e.code === 'ArrowUp'){this.upPressed = false}
        //if(e.code === 'ArrowDown'){this.downPressed = false}
        if (e.code === 'ArrowLeft') { this.leftPressed = false }
        if (e.code === 'ArrowRight') { this.rightPressed = false }
        if (e.code === 'Space') { this.espacoPressionar = false }
    }
}