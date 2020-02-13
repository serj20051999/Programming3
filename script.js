

function setup() {
    socket = io();

     side = 10;

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
                   
                    if(data.weatherserver == "Winter"){
                        fill('pink')
                    }
                    else if(data.weatherserver == "Autumn"){
                        fill('#F9A602') 
                    }
                    else if(data.weatherserver == "Spring"){
                        fill('#FCF4A3') 
                    }
                    else if(data.weatherserver == "Summer"){
                        fill('yellow')
                    }
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
function mousePressed() {
    var x = Math.floor(mouseX / side);
    var y = Math.floor(mouseY / side);
    var arr = [x,y];
    console.log(arr)
    if( arr[0]<=49 && arr[0]>=0  && arr[1]<=49 && arr[1]>=0 ) socket.emit("fire",arr)
    
    }

