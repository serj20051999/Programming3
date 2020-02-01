var socket= io();
let side = 10;
var m = 20;
var n = 20;

function setup() {
  
    createCanvas(m * side, n * side);
    background('grey');
    noStroke();
    frameRate(5);





}

function drawMatrix(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {

            if (matrix[y][x] == 1) {
                fill('green')
            }
            else if (matrix[y][x] == 2) {
                fill('yellow')
            }
            else if (matrix[y][x] == 3) {
                fill('red')
            }
            else if (matrix[y][x] == 4) {
                fill('cyan')
            }
            else if (matrix[y][x] == 5) {
                fill('black')
            }
            else {
                fill('grey')
            }
            rect(x * side, y * side, side, side)
        }
    }
   
}
socket.on("matrix",drawMatrix)