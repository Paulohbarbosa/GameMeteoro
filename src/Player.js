export default class Player {
    constructor(canvas, controleProjeteis) {
        //velocidade
        this.velocidade = 4;

        //tiro
        this.controleProjeteis = controleProjeteis;

        //entradas do tecaldo
        document.addEventListener('keydown', this.teclaPressionada);
        document.addEventListener('keyup', this.teclaSolta);

        //imagens
        const image = new Image();
        image.src = './src/imgs/nave.png'
        this.escala = 0.3

        image.onload = () => {

            this.image = image

            this.iRecorte = {
                x: 1405,
                y: 9
            }
            
            this.tRecorte = {
                x: 379,
                y: 554
            }

            this.largura = this.tRecorte.x * this.escala;
            this.altura = this.tRecorte.y * this.escala;

            this.pTela = {
                x: canvas.width / 2 - this.largura / 2,
                y: canvas.height - this.altura - 50
            }
        }
    }

    draw(c) {

        //função mover
        this.mover();

        //nave
        if (this.image) {
            c.drawImage(
                this.image,
                this.iRecorte.x,
                this.iRecorte.y,
                this.tRecorte.x,
                this.tRecorte.y,
                this.pTela.x,
                this.pTela.y,
                this.largura,
                this.altura
            );
        }

        //tiro
        this.atrirar();
    }

    // atirar
    atrirar() {
        if (this.espacoPressionar) {
            const x = this.pTela.x + this.largura / 2;
            const y = this.pTela.y;
            const velocidade = 5;
            const atraso = 10;
            const dano = 2;
            this.controleProjeteis.tiro(x, y, velocidade, atraso, dano);
        }
    }

    //mover o objeto
    mover() {
        //if(this.downPressed){this.y += this.velocidade}
        //if(this.upPressed){this.y -= this.velocidade}
        if (this.leftPressPressed) { this.pTela.x -= this.velocidade }
        if (this.rightPressed) { this.pTela.x += this.velocidade }
    }
    //quando a tecla é pressionada
    teclaPressionada = (e) => {
        // if(e.code === 'ArrowUp'){this.upPressed = true}
        // if(e.code === 'ArrowDown'){this.downPressed = true}
        if (e.code === 'ArrowLeft') { this.leftPressPressed = true }
        if (e.code === 'ArrowRight') { this.rightPressed = true }
        if (e.code === 'Space') { this.espacoPressionar = true }
    }

    //Quando a tecla é solta 
    teclaSolta = (e) => {
        //if(e.code === 'ArrowUp'){this.upPressed = false}
        //if(e.code === 'ArrowDown'){this.downPressed = false}
        if (e.code === 'ArrowLeft') { this.leftPressPressed = false }
        if (e.code === 'ArrowRight') { this.rightPressed = false }
        if (e.code === 'Space') { this.espacoPressionar = false }
    }
}