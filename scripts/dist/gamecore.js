var GameState;
(function (GameState) {
    GameState[GameState["Stopped"] = 0] = "Stopped";
    GameState[GameState["Running"] = 1] = "Running";
})(GameState || (GameState = {}));
var GameStage;
(function (GameStage) {
    GameStage[GameStage["Starting"] = 0] = "Starting";
    GameStage[GameStage["EpicFail"] = 1] = "EpicFail";
    GameStage[GameStage["Fail"] = 2] = "Fail";
    GameStage[GameStage["Victory"] = 3] = "Victory";
    GameStage[GameStage["GreatVictory"] = 4] = "GreatVictory";
    GameStage[GameStage["Ending"] = 5] = "Ending";
})(GameStage || (GameStage = {}));
var gameStageProgress = [false, false, false, false];
var gameResultTexts = [];
gameResultTexts.push("game over<br><br>what a shame<br>german invaders managed to blitzkrieged right to&nbsp;kazan in&nbsp;november&nbsp;1941<br><br>we have the darkest future");
gameResultTexts.push("game over<br><br>what a shame<br>german invaders managed to blitzkrieged right to&nbsp;kazan in&nbsp;november&nbsp;1941<br><br>we have the darkest future");
gameResultTexts.push("game over<br><br>alas<br>german onslaught defeated red army near&nbsp;stalingrad in&nbsp;june&nbsp;1942<br><br>we did our best");
gameResultTexts.push("game over<br><br>joyful news<br>heavy counterattack of red army made germans drew back near&nbsp;moscow in&nbsp;december&nbsp;1941<br><br>glory to red army");
gameResultTexts.push("game over<br><br>ha<br>wehrmacht barely reached minsk when red army showed them arsenal&nbsp;of&nbsp;socialism<br><br>red army is the strongest");
var currentResultText = gameResultTexts[0];
var currentGameStatus = GameState.Stopped;
var currentGameStage = GameStage.Starting;
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.code === "Enter") {
            event.preventDefault();
            if (currentGameStatus === GameState.Running) {
                currentGameStatus = GameState.Stopped;
            }
            else {
                currentGameStatus = GameState.Running;
                //runGameLoop();
                currentGameStage = GameStage.Starting;
                currentResultText = gameResultTexts[0];
                gameStageProgress = [false, false, false, false];
                resultField.innerHTML = currentResultText;
                runScoreLoop();
                runGunFiringLoop();
                runGunPositioningLoop();
                runScreenUpdaterLoop();
                runAudioLoop();
                runEnemyLoop();
            }
        }
    });
});
