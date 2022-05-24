import Bala from './Bala.js';

//fazer o score
const scoreEl = document.querySelector('#score');
let score = 0;

export default class ControleBalas {
    balas = [];
    atrasoNoTiro = 0;

    constructor() {
    }

    tiro(x, y,velocidade,atraso,dano) {

        if (this.atrasoNoTiro <= 0){
         this.balas.push(new Bala(x, y,velocidade,dano));
         this.atrasoNoTiro = atraso;
        }
        this.atrasoNoTiro --;
    }

    draw(c) {
        //console.log(this.balas.length);

        this.balas.forEach((bala) => {
            //limpar os tiros da memoria
            if(this.seBalasSairamDaTela(bala)){
                const index = this.balas.indexOf(bala);
                this.balas.splice(index, 1);
            }
            bala.draw(c);
        })
    }

    colisao(meteoro){
        return this.balas.some((bala) =>{
            if(bala.colisao(meteoro)){
                this.balas.splice(this.balas.indexOf(bala), 1);

                 //score implementação
                 score += 100;
                 scoreEl.innerHTML = score;

                return true;
            }
            return false;
        })
    }

    seBalasSairamDaTela(bala) {
        return bala.y <= -bala.height;
    }
}