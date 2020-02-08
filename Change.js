var LivingCreuture = require("./LivingCreuture.js")

module.exports = class Change extends LivingCreuture{
    constructor(x, y) {
        super(x,y)
        this.energy = 5;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
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
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }


    move() {
        this.energy--;
        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
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
    change() {

        this.getNewDirections();
        let chooseCells = this.chooseCell(3);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (newCell) {
            this.energy += 5;
            var x = newCell[0];
            var y = newCell[1];

            matrix[y][x] = 2;

            for (let index = 0; index < predatorArr.length; index++) {
                if (predatorArr[index].x == x && predatorArr[index].y == y) {
                    predatorArr.splice(index, 1)
                    predatorHashiv--
                    var newgrassEater = new GrassEater(x, y);
                    grassEaterArr.push(newgrassEater)
                    grassEaterHashiv++
                }
            }
            if (this.energy > 5) {
                this.mul()
            }
        }
        else { this.move() }
    }
    mul() {

        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (this.energy >= 10 && newCell) {
            var newchangerArr = new Change(newCell[0], newCell[1]);
            changerArr.push(newchangerArr);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in changerArr) {
            if (changerArr[i].y == this.y && changerArr[i].x == this.x) {
                changerArr.splice(i, 1);
            }
        }
    }


}
