var LivingCreuture = require("./LivingCreuture.js")

module.exports = class Grass extends LivingCreuture{
  
    mul() {
        this.energy++;
        let newCell = random(this.chooseCell(0));
        if (newCell && this.energy > 5) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.energy = 0;
        }
    }
}