var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);



function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, changerCount, monsterCount) {
    let matrix = [];
    for (let index = 0; index < matrixSize; index++) {
        matrix[index] = [];
        for (let i = 0; i < matrixSize; i++) {
            matrix[index][i] = 0;
        }
    }
    for (let index = 0; index < grassCount; index++) {
        let x = Math.floor(Math.random() * Math.floor(matrixSize));
        let y = Math.floor(Math.random() * Math.floor(matrixSize));
        matrix[y][x] = 1;
    }
    for (let index = 0; index < grassEaterCount; index++) {
        let x = Math.floor(Math.random() * Math.floor(matrixSize));
        let y = Math.floor(Math.random() * Math.floor(matrixSize));
        matrix[y][x] = 2;
    }
    for (let index = 0; index < predatorCount; index++) {
        let x = Math.floor(Math.random() * Math.floor(matrixSize));
        let y = Math.floor(Math.random() * Math.floor(matrixSize));
        matrix[y][x] = 3;
    }
    for (let index = 0; index < changerCount; index++) {
        let x = Math.floor(Math.random() * Math.floor(matrixSize));
        let y = Math.floor(Math.random() * Math.floor(matrixSize));
        matrix[y][x] = 4;
    }
    for (let index = 0; index < monsterCount; index++) {
        let x = Math.floor(Math.random() * Math.floor(matrixSize));
        let y = Math.floor(Math.random() * Math.floor(matrixSize));
        matrix[y][x] = 5;
    }
    return matrix;

}

grassArr = [];
grassEaterArr = [];
predatorArr = [];
changerArr = [];
monsterArr = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
weather = "Summer";
weatherCount = 1;
matrix = []

Grass = require("./Grass.js");
GrassEater = require("./GrassEater.js");
Predator = require("./Predator.js");
Change = require("./Change.js");
Monster = require("./Monster.js");

matrix = matrixGenerator(80, 500, 50, 30, 150, 50);

for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let grass = new Grass(x, y);
            grassArr.push(grass);
            grassHashiv++;
        }
        else if (matrix[y][x] == 2) {
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            grassEaterHashiv++
        }
        else if (matrix[y][x] == 3) {
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            predatorHashiv++
        }
        else if (matrix[y][x] == 4) {
            let changer = new Change(x, y);
            changerArr.push(changer);
        }
        else if (matrix[y][x] == 5) {
            let monster = new Monster(x, y);
            monsterArr.push(monster);
        }
    }
}

function getWeather(){
    weatherCount++
    if(weatherCount == 5){
        weatherCount = 1;
    }
    else if(weatherCount == 4){
        weatherCount = "Winter";
    }
    else if(weatherCount == 3){
        weatherCount = "Autumn";
    }
    else if(weatherCount == 2){
        weatherCount = "Spring";
    }
    else if(weatherCount == 1){
        weatherCount = "Summer";
    }
}

function drawserver() {
    if (grassArr[0] !== undefined) {
        for (let index = 0; index < grassArr.length; index++) {
            grassArr[index].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (let index = 0; index < grassEaterArr.length; index++) {
            grassEaterArr[index].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (let index = 0; index < predatorArr.length; index++) {
            predatorArr[index].eat();
        }
    }
    if (changerArr[0] !== undefined) {
        for (let index = 0; index < changerArr.length; index++) {
            changerArr[index].change();
        }
    }
    if (monsterArr[0] !== undefined) {
        for (let index = 0; index < monsterArr.length; index++) {
            monsterArr[index].eat();
            
            
        }
    }
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter:  predatorHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(drawserver, 500)