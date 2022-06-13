export default class Projetil{
    constructor(x,y,velocidade,dano){
        //posição
        this.x = x;
        this.y = y;

        this.velocidade = velocidade;

        this.dano = dano;

        //dimensões
        this.width = 5;
        this.height = 5;
    }
    draw(c){
        c.fillStyle = 'red';
        this.y -= this.velocidade;
        c.fillRect(this.x,this.y - this.height,this.width,this.height);
    }

    colisao(meteoro){
        if(this.x <= meteoro.aCPosX + meteoro.aCLargura &&
            this.x + this.width > meteoro.aCPosX &&
            this.y < meteoro.aCPosY + meteoro.aCAltura &&
            this.y + this.height > meteoro.aCPosY){
                meteoro.levaDano(this.dano);
                return true;
            }
            return false;
    }

    /*
    colisao(meteoro){
        if(this.x <= meteoro.pTelaX + meteoro.largura &&
            this.x + this.width > meteoro.pTelaX &&
            this.y < meteoro.pTelaY + meteoro.altura &&
            this.y + this.height > meteoro.pTelaY){
                meteoro.levaDano(this.dano);
                return true;
            }
            return false;
    }
    */
}