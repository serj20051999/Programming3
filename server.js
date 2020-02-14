var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

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
weatherinit = 0;
matrix = []

Grass = require("./Grass.js");
GrassEater = require("./GrassEater.js");
Predator = require("./Predator.js");
Change = require("./Change.js");
Monster = require("./Monster.js");

matrix = matrixGenerator(50, 500, 50, 30, 150, 50);

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
function getWeather() {
    weatherinit++;
    if (weatherinit == 5) {
        weatherinit = 1
        weather = "Summer"
    }

    else if (weatherinit == 1) {
        weather = "Summer"
    }

    else if (weatherinit == 2) {
        weather = "Spring"
    }

    else if (weatherinit == 3) {
        weather = "Autumn"
    }
    else if (weatherinit == 4) {
        weather = "Winter"
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
        predatorCounter: predatorHashiv,
        weatherserver: weather
    }
    io.sockets.emit("data", sendData);

    io.on("connection", function (socket) {
        
        socket.on("fire", function (arr) {
            
            var x = arr[0];
            var y = arr[1];
            
            var directions = [
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];
   
            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (y === grassArr[i].y && x === grassArr[i].x) {
                        grassArr.splice(i, 1);
                        grassHashiv--
                        break;
                    };
                }
            } else if (matrix[y][x] == 2) {
                for (var i in grassEaterArr) {
                    if (y === grassEaterArr[i].y && x === grassEaterArr[i].x) {
                        grassEaterArr.splice(i, 1);
                        grassEaterHashiv--
                        break;
                    };
                }
            }
           
            matrix[y][x] = 0;
            for (var i in directions) {
                let harevanx = directions[i][0];
                let harecvany = directions[i][1];
    
                if (matrix[harecvany][harevanx] == 1) {
                    for (var i in grassArr) {
                        if (y === grassArr[i].y && x === grassArr[i].x) {
                            grassArr.splice(i, 1);
                            grassHashiv--
                            break;
                        };
                    }
                } else if (matrix[harecvany][harevanx] == 2) {
                    for (var i in grassEaterArr) {
                        if (y === grassEaterArr[i].y && x === grassEaterArr[i].x) {
                            grassEaterArr.splice(i, 1);
                            grassEaterHashiv--
                            break;
                        };
                    }
                }
                matrix[harecvany][harevanx] = 0;
            }
    
            io.sockets.emit("data", sendData);
        });
    
    
    });
}


var obj = { "info": [] };

function writefile() {
    var fileName = "Statics.json";
    obj.info.push({
        "cnvac xoteri qanak ": grassHashiv,
        "cnvac xotakerneri qanak ": grassEaterHashiv,
        "cnvac predatorneri qanak ": predatorHashiv
    });
    fs.writeFileSync(fileName, JSON.stringify(obj, null, 3));
}

setInterval(getWeather, 3000);
setInterval(drawserver, 1000);
setInterval(writefile, 6000);