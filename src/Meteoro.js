export default class Meteoro{   
    constructor(pTelaX,pTelaY,peso, velocidade){
        //peso do meteoro
        this.peso = peso;

        //velocidade
        this.velocidade = velocidade;

        //imagens
       const image = new Image();
       image.src = './src/imgs/cometa.png'

       this.escala = 0.2

        image.onload = () =>{
            this.image = image
            this.recorte ={
                x:0,
                y:0,
            }
            this.tRecorte ={
                x:610,
                y:1087
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
        this.largura -= 0.5;
        this.altura -= 0.5;
    }
}