var LivingCreuture = require("./LivingCreuture.js")

module.exports = class Monster extends LivingCreuture {
    constructor(x, y) {
        super(x, y)
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

    //vorpes method
    getNewCoordinates() {
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


    //qayluma
    move() {
        this.energy--;
        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)];

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
    eat() {
        this.getNewCoordinates();
        let chooseCells = this.chooseCell(4);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]
        if (newCell) {
            this.energy += 20;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < changerArr.length; index++) {
                if (changerArr[index].x == x && changerArr[index].y == y) {
                    changerArr.splice(index, 1)
                }
            }

            if (this.energy > 60) {
                this.mul()
            }
        }
        else { this.move() }
    }
    mul() {

        let chooseCells = this.chooseCell(0);
        let newCell = chooseCells[Math.floor(Math.random() * chooseCells.length)]

        if (this.energy >= 8 && newCell) {
            var newmonsterArr = new Monster(newCell[0], newCell[1]);
            monsterArr.push(newmonsterArr);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in monsterArr) {
            if (monsterArr[i].y == this.y && monsterArr[i].x == this.x) {
                monsterArr.splice(i, 1);
            }
        }
    }


}