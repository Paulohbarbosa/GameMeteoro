export default class Bala{
    constructor(x,y,velocidade){
        this.x = x;
        this.y = y;
        this.velocidade = velocidade;

        //dimensões
        this.width = 5;
        this.height = 15;
    }
    draw(c){
        c.fillStyle = 'red';
        this.y -= this.velocidade;
        c.fillRect(this.x,this.y,this.width,this.height);
    }
}