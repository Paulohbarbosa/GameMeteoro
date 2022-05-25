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
        if(this.x < meteoro.posicaoNaTela.x + meteoro.largura &&
            this.x + this.width > meteoro.posicaoNaTela.x &&
            this.y < meteoro.posicaoNaTela.y + meteoro.altura &&
            this.y + this.height > meteoro.posicaoNaTela.y){
                meteoro.levaDano(this.dano);
                return true;
            }
            return false;
    }
}