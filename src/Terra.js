export default class Terra{

    constructor(canvas) {
        this.x = canvas.width / 2;
        this.y = 325;

        this.velocidade = 10;

        const image = new Image();
        image.src = './src/imgs/planeta.png';

        this.escala = 0.2;

        image.onload = () => {
            this.image = image;
            this.largura = image.width * this.escala;
            this.altura = image.height * this.escala;
        }
    }

    draw(c) {

        if (this.image) {
            c.drawImage(
                this.image, 
                this.x - (this.largura / 2), 
                this.y - (this.altura / 2), 
                this.largura, this.altura
            );
        }
    }

    update() {
        if (this.y <= 1050) {
            this.altura += 12;
            this.largura += 12;
            this.y += this.velocidade;
        }
    }

}