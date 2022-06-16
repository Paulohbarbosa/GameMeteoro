export default class Meteoro {
    constructor(pTelaX, poTelaY, escala, linha, velocidade,peso) {
        this.pTelaX = pTelaX;
        this.poTelaY = poTelaY;
        this.peso = peso;
        this.velocidade = velocidade;
        this.posicao = linha;
        this.escala = escala;
        this.desacelerar = 0

        this.meteoro = [0, 450, 901, 1350];

        //imagens
        const image = new Image();
        image.src = './src/imgs/cometa.png'

        image.onload = () => {

            this.image = image

            this.recorteX= this.meteoro[this.posicao];
            this.recorteY= 0;
            this.tRecorteX = 450;
            this.tRecorteY = 1206;

            this.largura = (this.tRecorteX * this.escala) 
            this.altura = (this.tRecorteY * this.escala)
            
            this.pTelaY = this.poTelaY - this.altura

            //area do desenho para a colisão
            this.recuo = 5;
            this.aCPosX = this.pTelaX + (this.recuo / 2);
            this.aCPosY = (this.pTelaY - (this.pTelaY + this.altura / 3)) + (this.recuo / 2);
            this.aCLargura = this.largura - this.recuo;
            this.aCAltura = (this.altura / 3) - this.recuo;
        }

        this.somExplosao = new Audio('./src/sounds/explosao.mp3');
        this.somExplosao.volume = 0.1;
    }

    draw(c) {
        
        c.beginPath();
        //imagem do meteoro
        if (this.image) {
            c.drawImage(
                this.image,
                this.recorteX,
                this.recorteY,
                this.tRecorteX,
                this.tRecorteY,
                this.pTelaX,
                this.pTelaY,
                this.largura,
                this.altura
            );
        }

        this.info(c);

        //area de colisão
        //this.caixa(c,'red',this.aCPosX, this.aCPosY, this.aCLargura, this.aCAltura);
        //area do desenho
       //this.caixa(c,'white',this.pTelaX, this.pTelaY, this.largura, this.altura);
       
        //movimento do cometa
        this.pTelaY += this.velocidade;
        this.aCPosY += this.velocidade;
    }

    levaDano(dano) {
        this.peso -= dano;

        if(this.desacelerar <= 5){
            this.velocidade -= 0.005;
            this.desacelerar++
        }
    }

    caixa(c, cor, x, y, largura, altura ) {

        c.strokeStyle = cor
        c.stroke();
        c.strokeRect(x, y, largura, altura)
    }

    info(c) {
        //texto do peso do meteoro
        c.fillStyle = 'white'
        c.font = '22px arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(this.peso, this.aCPosX + this.aCLargura/2, this.aCPosY + this.aCAltura /2);
    }
}