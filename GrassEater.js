var LivingCreuture = require("./LivingCreuture.js")

module.exports = class GrassEater extends LivingCreuture{
    constructor(x, y) {
        super(x,y)
        this.energy = 30;
        
    }
   
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            grassEaterHashiv++
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < grassEaterArr.length; index++) {
            if (grassEaterArr[index].x == this.x && grassEaterArr[index].y == this.y) {
                grassEaterArr.splice(index, 1)
                grassEaterHashiv--
            }
        }
    }
    eat() {
        this.getNewDirections();
        let chooseCells = this.chooseCell(1);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (newCell) {
            this.energy += 5;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassArr.length; index++) {
                if (grassArr[index].x == x && grassArr[index].y == y) {
                    grassArr.splice(index, 1)
                    grassHashiv--
                }
            }
            if (weather == "Spring") {
                if (this.energy > 40) {
                    this.mul()
                }
            }
            else if (weather == "Summer") {
                if (this.energy > 20) {
                    this.mul()
                }
            }
            else if (weather == "Winter") {
                if (this.energy > 100) {
                    this.mul()
                }
            }
            else if (weather == "Autumn") {
                if (this.energy > 50) {
                    this.mul()
                }
            }
           
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (newCell && this.energy < 0) {
            this.die();
        }
        if (this.energy < 0) {
            this.die();
        }
    }
}