import Meteoro from './Meteoro.js'

export default class ControleMeteoros {
    constructor() {
        this.y = 0;
        this.velocidade = 0;
        this.peso = 0;
        this.escala = 0;

        this.listaMeteoros = [];

        this.gerarMeteoro();
    }

    gerarMeteoro() {
        this.x = Math.floor(Math.random() * 1000);
        this.modelo = Math.floor(Math.random() * 3);
        this.velocidade = Math.random() * 2 + 0.2;

        if (this.velocidade < 0.5) {
            this.peso = Math.floor(Math.random() * 500 + 300);
            this.escala = Math.random() * 0.9 + 0.2;
        }else if (this.velocidade < 1) {
            this.peso = Math.floor(Math.random() * 300 + 200);
            this.escala = Math.random() * 0.09 + 0.2;
        } else if (this.velocidade > 1 && this.velocidade < 1.5) {
            this.peso = Math.floor(Math.random() * 10 + 200);
            this.escala = Math.random() * 0.08 + 0.15
        } else {
            this.peso = Math.floor(Math.random() * 10 + 100);
            this.escala = 0.07
        }

        this.listaMeteoros.push(

            new Meteoro(
                this.x,
                this.y,
                this.escala,
                this.modelo,
                this.velocidade,
                this.peso
            ));
    }
    seMeteoroSairDaTela(meteoro) {
        return meteoro.y <= -meteoro.altura;
    }
} 