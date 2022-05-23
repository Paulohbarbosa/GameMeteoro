export default class Player{
    constructor(x,y){
        this.x = x;
        this.y = y;

        this.width = 50;
        this.height = 50;
    }

    draw(c) {
        c.fillStyle = 'yellow';
        c.fillRect(this.x,this.y,this.width,this.height);
    }
}