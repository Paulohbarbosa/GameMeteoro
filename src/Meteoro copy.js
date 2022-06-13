export default class Meteoro {
    //matriz das imagens

    matrizImgMeteoro = [
        [0, 0, 610, 1087],
        [3148, 146, 478, 452],
        [0, 1441, 801, 655],
        [215, 2358, 526, 522],
        [2772, 1786, 410, 1109],

        [841, 0, 366, 1080],
        [1383, 0, 331, 1098],
        [2017, 23, 367, 648],
        [2059, 788, 325, 562],
        [2596, 0, 265, 498],
        [2574, 522, 315, 842]
    ];

    constructor(pTelaX, poTelaY, escala, linha, velocidade,peso) {

        this.pTelaX = pTelaX;
        this.poTelaY = poTelaY;
        this.peso = peso;
        this.velocidade = velocidade;
        this.linha = linha;
        this.escala = escala;
        this.desacelerar = 0

        //imagens
        const image = new Image();
        image.src = './src/imgs/cometa.png'

        image.onload = () => {

            this.image = image

            this.recorte = {
                x: this.matrizImgMeteoro[this.linha][0],
                y: this.matrizImgMeteoro[this.linha][1]
            }
            this.tRecorte = {
                x: this.matrizImgMeteoro[this.linha][2],
                y: this.matrizImgMeteoro[this.linha][3]
            }

            this.largura = (this.tRecorte.x * this.escala) + this.peso / 2
            this.altura = (this.tRecorte.y * this.escala) + this.peso / 2

            this.pTelaY = this.poTelaY - this.altura
        }

        this.somExplosao = new Audio('./src/sounds/explosao.mp3');
        this.somExplosao.volume = 0.1;
    }

    draw(c) {

        //imagem do meteoro
        if (this.image) {
            c.drawImage(
                this.image,
                this.recorte.x,
                this.recorte.y,
                this.tRecorte.x,
                this.tRecorte.y,
                this.pTelaX,
                this.pTelaY,
                this.largura,
                this.altura
            );
        }

        //texto do peso do meteoro
        c.fillStyle = 'white'
        c.font = '30px arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(this.peso, this.pTelaX + this.largura / 2, this.pTelaY + this.altura / 2);

        //movimento do cometa
        this.pTelaY += this.velocidade;
    }

    levaDano(dano) {
        this.peso -= dano;

        if(this.desacelerar <= 5){
            this.velocidade -= 0.005;
        }
    }
}