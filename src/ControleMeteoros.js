import Meteoro from './Meteoro.js'

export default class ControleMeteoros {
    constructor() {
        this.y = 0;
        this.velocidade = {
            x: 0,
            y: 0
        }
        this.peso = 0;
        this.espaco = 0;
        this.escla = 0.01;

        this.listaMeteoros = [];

        this.gerarMeteoro();
    }

    update() {

    }

    gerarMeteoro() {
        this.x = Math.floor(Math.random() * 600) + this.espaco;
        this.modelo = Math.floor(Math.random() * 4); // + 1
        this.velocidade = Math.random() * 2.2 + 0.2;
        console.log('velocidade:'+this.velocidade);

        if(this.velocidade < 1){
            this.peso = 300;
        }else{
            this.peso = Math.floor(Math.random() * 10 + 100);
        }
        

        this.listaMeteoros.push(

            new Meteoro(
                this.x,
                this.y,
                this.escla,
                this.modelo,
                this.velocidade,
                this.peso
            ));

        //console.log(this.listaMeteoros);
        this.espaco += 100;
    }
    seMeteoroSairDaTela(meteoro) {
        return meteoro.y <= -meteoro.altura;
    }
} 