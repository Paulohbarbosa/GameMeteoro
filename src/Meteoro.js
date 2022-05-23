export default class Meteoro{
    constructor(x,y){
        //posição na tela
        this.x = x;
        this.y = y;

        //tamanho do objeto
        this.width = 200;
        this.height = 200;

        //peso do meteoro
        this.peso = (this.width + this.height) / 2;
    }

    draw(c){
        //stilo do Meteoro
        c.fillStyle = 'white'
        c.fillRect(this.x, this.y, this.width, this.height);

        //texto do peso do meteoro
        c.fillStyle = 'black'
        c.font = '30px arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle'
        c.fillText(
            this.peso, //o quê vai ser desenhado
            this.x + this.width/ 2, //onde vai ser desenhado na largura
            this.y + this.height/2  // onde vai ser desenhado na altura
        );
    }
}