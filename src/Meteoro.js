export default class Meteoro{
    //matriz das imagens

    matrizImgMeteoro = [
        [0,0,610,1087],
        [841,0,366,1080],
        [1383,0,331,1098],
        [2017,23,367,648],
        [2059,788,325,562],
        [2596,0,265,498],
        [2574,522,315,842],
        [3148,146,478,452],
        [0,1441,801,655],
        [215,2358,526,522],
        [2772,1786,410,1109]
    ]
    constructor(pTelaX,pTelaY,peso, velocidade){
        //peso do meteoro
        this.peso = peso;

        //velocidade
        this.velocidade = velocidade;

        //imagens
       const image = new Image();
       image.src = './src/imgs/cometa.png'
       this.escala = 0.2

       this.linha = 10

        image.onload = () =>{

            this.image = image

            this.recorte ={
                x: this.matrizImgMeteoro[this.linha][0],
                y: this.matrizImgMeteoro[this.linha][1]
            }
            this.tRecorte ={
                x: this.matrizImgMeteoro[this.linha][2],
                y: this.matrizImgMeteoro[this.linha][3]
            }
            this.posicaoNaTela ={
                x: pTelaX,
                y: pTelaY - 500
            }
            this.largura = (this.tRecorte.x * this.escala)  + this.peso /2
            this.altura = (this.tRecorte.y * this.escala) + this.peso /2
        }
    }

    draw(c){
        this.posicaoNaTela.y += this.velocidade
        //imagem do meteoro
        if(this.image){
            c.drawImage(
                this.image,
                this.recorte.x,
                this.recorte.y,
                this.tRecorte.x,
                this.tRecorte.y,
                this.posicaoNaTela.x,
                this.posicaoNaTela.y,
                this.largura,
                this.altura
            );
        }

        //texto do peso do meteoro
        c.fillStyle = 'white'
        c.font = '30px arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle'
        c.fillText(
            this.peso + ' t', //o que vai ser desenhado 
            this.posicaoNaTela.x + this.largura / 2, //onde vai ser desenhado na largura
            this.posicaoNaTela.y + this.altura / 2 // onde vai ser desenhado na altura
        );
    }
    
    levaDano(dano){
        this.peso -= dano;
        this.largura -= 0.8;
        this.altura -= 0.8;
    }
}