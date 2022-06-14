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

        //peso
        this.energia = 200;

        //entradas do tecaldo
        document.addEventListener('keydown', this.teclaPressionada);
        document.addEventListener('keyup', this.teclaSolta);

        //linha e coluna;
        this.linha = 6;

        //força do disparo
        this.dano = 10;

        //imagens
        const image = new Image();
        image.src = './src/imgs/nave.png'
        this.escala = 0.09

        image.onload = () => {

            this.image = image

            this.largura = 0;
            this.altura = 0;

            this.pTelaX = this.canvas.width / 2,
            this.pTelaY = this.canvas.height - 200
        }
        this.somExplosao = new Audio('./src/sounds/explosaoNave.mp3');
        this.somExplosao.volume = 0.5;

        this.gameframe = 0;
        this.ir = true;
        this.intervalo = 5;
    }

    draw(c) {

        if (this.intacto) {

            //função mover
            this.mover();

            //nave
            if (this.image) {
                if (this.linha < 0) {
                    this.linha = 0;
                }
                if (this.linha > 12) {
                    this.linha = 12;
                }
                c.drawImage(
                    this.image,
                    this.matrizesImgNave[this.linha][0],
                    this.matrizesImgNave[this.linha][1],
                    this.matrizesImgNave[this.linha][2],
                    this.matrizesImgNave[this.linha][3],
                    this.pTelaX,
                    this.pTelaY,
                    this.largura = this.matrizesImgNave[this.linha][2] * this.escala,
                    this.altura = this.matrizesImgNave[this.linha][3] * this.escala
                );
            }

            if (this.gameframe % this.intervalo == 0) {
                //direita
                if (this.linha <= 12 && this.rightPressed) {
                    this.linha++;
                    this.velocidade += 0.5;
                    if (this.linha == 12) {
                        this.ir = false;
                    }
                } else if (this.linha > 6 && this.ir == false) {
                    this.linha--;
                    if (this.linha == 6) {
                        this.ir = true;
                    }
                } else if (this.linha <= 6 && this.leftPressed) {
                    this.linha--;
                    this.velocidade += 0.5;
                    if (this.linha == 0) {
                        this.ir = false;
                    }
                } else if (this.linha >= 0 && this.ir == false) {
                    this.linha++;
                    if (this.linha == 6) {
                        this.ir = false;
                    }
                } else {
                    this.linha = 6;
                    this.velocidade = 4;
                }
            }

            this.gameframe++;

            //tiro
            this.atrirar();

            this.info(c);

            //this.caixa(c);
        }
    }

    // atirar
    atrirar() {
        if (this.espacoPressionar) {
            const x = this.pTelaX + this.largura / 2;
            const y = this.pTelaY;
            const velocidade = 10;
            const atraso = 10;
            this.controleProjeteis.tiro(x, y, velocidade, atraso, this.dano);
        }
    }

    caixa(c) {
        c.strokeStyle = 'white'
        c.stroke();
        c.strokeRect(this.pTelaX, this.pTelaY, this.largura, this.altura)
    }

    info(c) {
        //texto do peso do player
        c.fillStyle = 'white'
        c.font = '16px arial';
        c.textAlign = 'center';
        c.textBaseline = 'bootom';
        c.fillText(this.energia, this.pTelaX + this.largura/2, this.pTelaY + this.altura + 10);
    }

    //mover o objeto
    mover() {
        if (this.leftPressed && this.pTelaX >= 20) {
            this.pTelaX -= this.velocidade;
        } else if (this.rightPressed && this.pTelaX + this.largura <= (this.canvas.width -30)) {
            this.pTelaX += this.velocidade;
        }
    }
    //quando a tecla é pressionada
    teclaPressionada = (e) => {
        if (e.code === 'ArrowLeft') { this.leftPressed = true }
        if (e.code === 'ArrowRight') { this.rightPressed = true }
        if (e.code === 'Space') { this.espacoPressionar = true }
    }

    //Quando a tecla é solta 
    teclaSolta = (e) => {
        if (e.code === 'ArrowLeft') { this.leftPressed = false }
        if (e.code === 'ArrowRight') { this.rightPressed = false }
        if (e.code === 'Space') { this.espacoPressionar = false }
    }
}