import Bala from './Bala.js';

export default class ControleBalas {
    balas = [];
    atrasoNoTiro = 0;

    constructor(canvas) {
        this.canvas = canvas;
    }

    tiro(x, y, velocidade,atraso) {

        if (this.atrasoNoTiro <= 0){
         this.balas.push(new Bala(x, y, velocidade));
         this.atrasoNoTiro = atraso;
        }
        this.atrasoNoTiro --;
    }

    draw(c) {
        this.balas.forEach((bala) => {
            bala.draw(c);
        })
    }
}