import Meteoro from './Meteoro.js'

export default class ControleMeteoros {
    constructor() {
        this.posicao = {
            x: 50,
            y: 0
        }
        this.velocidade = {
            x: 0,
            y: 0
        }
        this.peso = 0;
        this.espaco = 0;
        this.escla = 0.1;

        this.listaMeteoros = [];

        this.gerarMeteoro();
    }

    update() {

    }

    gerarMeteoro() {
        this.x = Math.floor(Math.random() * 600) + this.espaco;
        this.modelo = Math.floor(Math.random() * 4); // + 1
        this.velocidade = Math.random() * 3 + 0.2;
        this.listaMeteoros.push(

            new Meteoro(
                this.x,
                this.posicao.y,
                this.escla,
                this.modelo,
                this.velocidade
            ));

        //console.log(this.listaMeteoros);
        this.espaco += 100;
    }
    seMeteoroSairDaTela(meteoro) {
        return meteoro.y <= -meteoro.altura;
    }
} 