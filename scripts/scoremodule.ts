var score: number = 0;
var scoreSpeed: number = 100; // in ms

var epicFailScore: number = 10;
var failScore: number = 100;
var victoryScore: number = 200;
var greatVictoryScore: number = 400;

const scoreField = document.getElementById("score-val")!;
const resultField = document.getElementById("conclusion-text")!;

async function runScoreLoop(): Promise<void>{
    resultField.style.display= "none";

    while(currentGameStatus === GameState.Running){
        score++;
        displayScore();

        if(score == epicFailScore){
            switchGameStage(GameStage.EpicFail);
            sounds[3][0].play();
        }else if(score == failScore){
            switchGameStage(GameStage.Fail);
            sounds[4][0].play();
        }else if(score == victoryScore){
            switchGameStage(GameStage.Victory);
            sounds[5][0].play();
        }else if(score == greatVictoryScore){
            switchGameStage(GameStage.GreatVictory);
            sounds[6][0].play();
        }

        await sleep(scoreSpeed);
    }

    resultField.style.display= "block";
    score = 0;
}

function displayScore(): void{
    scoreField.textContent = score.toString();
}

function switchGameStage(gameStage: GameStage ):void {
    currentGameStage = gameStage;
    gameStageProgress[currentGameStage] = true;
    currentResultText = gameResultTexts[currentGameStage];
    resultField.innerHTML = currentResultText;
}