export default class Particulas{
    constructor({posicao,velocidade,raio,cor,trasparencia}){
        this.posicao = posicao;
        this.velocidade = velocidade;
        this.raio = raio;
        this.cor = cor;
        this.trasparencia = trasparencia;
        this.opacidade = 1;
    }

    draw(c) {
        c.save();
        c.globalAlpha = this.opacidade;
        c.beginPath();        
        c.arc(this.posicao.x,this.posicao.y,this.raio,0,Math.PI * 2);
        c.fillStyle = this.cor;
        c.fill();
        c.closePath();
        c.restore();
    }

    update(c){
        this.draw(c);
        this.posicao.x += this.velocidade.x;
        this.posicao.y += this.velocidade.y;
        if (this.trasparencia){
            this.opacidade -= 0.01;
        }
    }
}