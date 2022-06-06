import Projetil from './Projetil.js';

//fazer o score
const scoreEl = document.querySelector('#score');
let score = 0;

export default class ControleProjeteis {
    projeteis = [];
    atrasoNoTiro = 0;
    
    tiro(x, y,velocidade,atraso,dano) {

        if (this.atrasoNoTiro <= 0){
         this.projeteis.push(new Projetil(x, y,velocidade,dano));
         this.atrasoNoTiro = atraso;
        }
        this.atrasoNoTiro --;
    }

    draw(c) {
        this.projeteis.forEach((projetil) => {

            //limpar os tiros da memoria
            if(this.seProjeteisSairamDaTela(projetil)){
                const index = this.projeteis.indexOf(projetil);
                this.projeteis.splice(index, 1);
            }
            projetil.draw(c);
            //console.log(this.projeteis);
        })
    }

    colisao(meteoro){
        return this.projeteis.some((projetil) =>{
            if(projetil.colisao(meteoro)){
                this.projeteis.splice(
                    this.projeteis.indexOf(projetil), 1
                );
                 //score implementação
                 score += 10;
                 scoreEl.innerHTML = score;

                return true;
            }
            return false;
        })
    }

    seProjeteisSairamDaTela(projetil) {
        return projetil.y <= -projetil.height;
    }
}