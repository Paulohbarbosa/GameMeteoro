export default class Bala{
    constructor(x,y,velocidade,dano){
        //posição
        this.x = x;
        this.y = y;

        this.velocidade = velocidade;

        this.dano = dano;

        //dimensões
        this.width = 5;
        this.height = 15;
    }
    draw(c){
        c.fillStyle = 'red';
        this.y -= this.velocidade;
        c.fillRect(this.x,this.y,this.width,this.height);
    }

    colisao(meteoro){
        if(this.x < meteoro.x + meteoro.width &&
            this.x + this.width > meteoro.x &&
            this.y < meteoro.y + meteoro.height &&
            this.y + this.height > meteoro.y){
                meteoro.levaDano(this.dano);
                return true;
            }
            return false;
    }
}