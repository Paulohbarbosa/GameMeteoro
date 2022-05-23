import Bala from './Bala.js';

export default class ControleBalas {
    balas = [];

    constructor(canvas) {
        this.canvas = canvas;
    }

    tiro(x, y, velocidade) {
        this.balas.push(new Bala(x, y, velocidade));
    }

    draw(c) {
        this.balas.forEach((bala) => {
            bala.draw(c);
        })
    }
}