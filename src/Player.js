export default class Player{
    constructor(x,y,controleBala){

        //posição na tela
        this.x = x;
        this.y = y;

        //tamnho do objeto
        this.width = 50;
        this.height = 50;

        //velocidade
        this.velocidade = 4;

        //tiro
        this.controleBala = controleBala;

        //entradas do tecaldo
        document.addEventListener('keydown', this.teclaPressionada);
        document.addEventListener('keyup', this.teclaSolta);
    }

    draw(c) {

        //função mover
        this.mover();

        //Estilo do objeto
        c.fillStyle = 'yellow';
        c.fillRect(this.x,this.y,this.width,this.height); 
        
        //tiro
        this.atrirar();
    }

    // atirar
    atrirar(){
        if(this.espacoPressionar){
            const x = this.x + this.width / 2;
            const y = this.y;
            const velocidade = 5;
            const atraso = 10;
            const dano = 2;
            this.controleBala.tiro(x,y,velocidade,atraso,dano);
        }
    }

    //mover o objeto
    mover() {
        //if(this.downPressed){this.y += this.velocidade}
        //if(this.upPressed){this.y -= this.velocidade}
        if(this.leftPressPressed){this.x -= this.velocidade}
        if(this.rightPressed){this.x += this.velocidade}
    }
    //quando a tecla é pressionada
    teclaPressionada =(e) => {
       // if(e.code === 'ArrowUp'){this.upPressed = true}
       // if(e.code === 'ArrowDown'){this.downPressed = true}
        if(e.code === 'ArrowLeft'){this.leftPressPressed = true}
        if(e.code === 'ArrowRight'){this.rightPressed = true}
        if(e.code === 'Space'){this.espacoPressionar = true}
    }

    //Quando a tecla é solta 
    teclaSolta =(e) => {
        //if(e.code === 'ArrowUp'){this.upPressed = false}
        //if(e.code === 'ArrowDown'){this.downPressed = false}
        if(e.code === 'ArrowLeft'){this.leftPressPressed = false}
        if(e.code === 'ArrowRight'){this.rightPressed = false}
        if(e.code === 'Space'){this.espacoPressionar = false}
    }
}