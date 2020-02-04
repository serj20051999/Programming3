

function setup() {
    var socket = io();

    let side = 10;

    matrix = [];

    socket.on("matrix", drawMatrix)

    function drawMatrix(matrix) {


        matrix = matrix;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');

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
}
