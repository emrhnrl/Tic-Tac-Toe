let tile = document.querySelectorAll(".tile");
let resetButton = document.getElementById("reset-button");
const player = createPlayer();
const opponent = createPlayer();
const newGame = gameRules();

function createPlayer(playerName, playerChar) {
    return {
        playerName: playerName,
        playerChar: playerChar,
        score: [],
        playerTries: 0,
        playerScoreDisplay() {
            return this.score;
        }
    };
}

function gameRules() {
    return {
        win: [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [3, 5, 7],
            [4, 5, 6],
            [7, 8, 9]
        ],
        condition: true
    }
}

function startGame() {

    for (let i = 0; i < tile.length; i++) {

        tile[i].addEventListener("click", function() {
            if (newGame.condition === true) {
                if (tile[i].innerHTML === "") {
                    player.score.push(parseInt(tile[i].id));
                    player.playerTries++;
                    tile[i].appendChild(document.createTextNode("X"));

                    if (player.playerTries === 5) {
                        return document.getElementById("title").innerHTML = "Draw!"
                    }
 
                    if (player.playerTries > 2) {
                        for (let i = 0; i < newGame.win.length; i++) {
                            if (player.score.includes(newGame.win[i][0]) && player.score.includes(newGame.win[i][1]) && player.score.includes(newGame.win[i][2])) {
                                newGame.condition = false;
                                return document.getElementById("title").innerHTML = "You Win!"
                            }
                        }
                    }
                    return setTimeout(opponentTurn, 500, newGame.win, opponent, player);
                }
            }

        });
    };
}

function opponentTurn(gameRules, opponent, player) {

    opponent.playerTries++;

    for (let i = 0; i < tile.length; i++) {
        if (tile[i].innerHTML === "") {

            for (let j = 0; j < gameRules.length; j++) {
                if (opponent.score.includes(gameRules[j][0]) && opponent.score.includes(gameRules[j][1])) {
                    if (document.getElementById(gameRules[j][2]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][2]));
                        document.getElementById(gameRules[j][2]).innerHTML = "O";
                        newGame.condition = false;
                        return document.getElementById("title").innerHTML = "Opponent Wins!";
                    }
                }
                if (opponent.score.includes(gameRules[j][1]) && opponent.score.includes(gameRules[j][2])) {
                    if (document.getElementById(gameRules[j][0]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][0]));
                        document.getElementById(gameRules[j][0]).innerHTML = "O";
                        newGame.condition = false;
                        return document.getElementById("title").innerHTML = "Opponent Wins!";

                    }
                }
                if (opponent.score.includes(gameRules[j][2]) && opponent.score.includes(gameRules[j][0])) {
                    if (document.getElementById(gameRules[j][1]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[j][1]));
                        document.getElementById(gameRules[j][1]).innerHTML = "O";
                        newGame.condition = false;
                        return document.getElementById("title").innerHTML = "Opponent Wins!";
                    }
                }
            }

            for (let k = 0; k < gameRules.length; k++) {
                if (player.score.includes(gameRules[k][0]) && player.score.includes(gameRules[k][1])) {
                    if (document.getElementById(gameRules[k][2]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][2]));
                        return document.getElementById(gameRules[k][2]).innerHTML = "O";
                    }
                }
                if (player.score.includes(gameRules[k][2]) && player.score.includes(gameRules[k][0])) {
                    if (document.getElementById(gameRules[k][1]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][1]));
                        return document.getElementById(gameRules[k][1]).innerHTML = "O";
                    }
                }
                if (player.score.includes(gameRules[k][1]) && player.score.includes(gameRules[k][2])) {
                    if (document.getElementById(gameRules[k][0]).innerHTML === "") {
                        opponent.score.push(parseInt(gameRules[k][0]));
                        return document.getElementById(gameRules[k][0]).innerHTML = "O";
                    }
                }
            }
        };
    }

    function randomMove() {
        for (let i = 0; i < tile.length; i++) {
            let num = Math.floor(Math.random() * 9) + 1;
            if (document.getElementById(num).innerHTML === "") {
                opponent.score.push(parseInt(num));
                return document.getElementById(num).innerHTML = "O";
            }
        }
    }
    randomMove();
}

resetButton.addEventListener("click", function() {
    window.location.reload();
});


startGame();