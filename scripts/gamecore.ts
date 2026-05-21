enum GameState {
    Stopped,
    Running
}

enum GameStage {
    Starting = 0,
    EpicFail = 1,
    Fail = 2,
    Victory = 3,
    GreatVictory = 4,
    Ending = 5
}

var gameStageProgress: boolean[] = [false, false, false, false];

var gameResultTexts: string[] = [];
gameResultTexts.push("game over<br><br>what a shame<br>german invaders managed to blitzkrieged right to&nbsp;kazan in&nbsp;november&nbsp;1941<br><br>we have the darkest future");
gameResultTexts.push("game over<br><br>what a shame<br>german invaders managed to blitzkrieged right to&nbsp;kazan in&nbsp;november&nbsp;1941<br><br>we have the darkest future");
gameResultTexts.push("game over<br><br>alas<br>german onslaught defeated red army near&nbsp;stalingrad in&nbsp;june&nbsp;1942<br><br>we did our best");
gameResultTexts.push("game over<br><br>joyful news<br>heavy counterattack of red army made germans drew back near&nbsp;moscow in&nbsp;december&nbsp;1941<br><br>glory to red army");
gameResultTexts.push("game over<br><br>ha<br>wehrmacht barely reached minsk when red army showed them arsenal&nbsp;of&nbsp;socialism<br><br>red army is the strongest");
var currentResultText: string = gameResultTexts[0];

var currentGameStatus: GameState = GameState.Stopped;
var currentGameStage: GameStage = GameStage.Starting;

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === "Enter") {
            event.preventDefault();

            if (currentGameStatus === GameState.Running) {
                currentGameStatus = GameState.Stopped;
            } else {
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