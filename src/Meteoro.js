export default class Meteoro{   
    constructor(pTelaX,pTelaY,peso){
        //peso do meteoro
        this.peso = peso;

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
                x:580,
                y:1087
            }
            this.posicaoNaTela ={
                x: pTelaX,
                y: pTelaY
            }
            this.largura = this.tRecorte.x * this.escala
            this.altura = this.tRecorte.y * this.escala
        }
    }

    draw(c){
        
        //imagem do meteoro
        if(this.image){
            //c.drawImage(this.image,0,0,580,1087,10,10,580*0.2,1087*0.2);
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

        //stilo do Meteoro
       //c.fillStyle = 'white'
       //c.fillRect(this.x, this.y, this.width, this.height);

        //texto do peso do meteoro
        c.fillStyle = 'white'
        c.font = '30px arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle'
        c.fillText(
            this.peso, //o quê vai ser desenhado 
            this.posicaoNaTela.x + this.largura / 2, //onde vai ser desenhado na largura
            this.posicaoNaTela.y + this.altura / 2 // onde vai ser desenhado na altura
        );
    }

    levaDano(dano){
        this.peso -= dano;
    }
}