

function setup() {
    var socket = io();

    let side = 10;

    matrix = [];

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let clientwheater = document.getElementById("weatherClient");
    
    socket.on("data", drawMatrix)

    function drawMatrix(data) {


        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        clientwheater.innerText = data.weatherserver;

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');

        for (let y = 0; y < matrix.length; y++) {
            const element = matrix[y];
            for (let x = 0; x < element.length; x++) {

                if (matrix[y][x] == 1) {
                    
                    if(data.weatherserver == "Winter"){
                        fill('white')
                    }
                    else if(data.weatherserver == "Autumn"){
                        fill('darkgreen') 
                    }
                    else if(data.weatherserver == "Spring"){
                        fill('#90ee90') 
                    }
                    else if(data.weatherserver == "Summer"){
                        fill('green') 
                    }
                    

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
