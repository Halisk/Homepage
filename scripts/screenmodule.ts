const gameScreen: HTMLCanvasElement = document.getElementById("game-screen")! as HTMLCanvasElement;
var context = gameScreen.getContext("2d")!;

var updateFrequency: number = 200; // ms

const backgroundImg = new Image();
backgroundImg.src = "images/sprites/background.jpg";
const labelImg = new Image();
labelImg.src = "images/sprites/label.jpg";

const bulletHoleImg = new Image();
bulletHoleImg.src = "images/sprites/bullethole.png";

const gunCalmImg = new Image();
gunCalmImg.src = "images/sprites/gun_calm.png";
const gunFireImg = new Image();
gunFireImg.src = "images/sprites/gun_fire.png";
const gunReloadImg = new Image();
gunReloadImg.src = "images/sprites/gun_reload.png";

const boomImg = new Image();
boomImg.src = "images/sprites/boom.png";

window.addEventListener('load', () => {
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(labelImg, 106, 0, 300, 384);
});

async function runScreenUpdaterLoop(): Promise<void>{
    while(currentGameStatus === GameState.Running){
        for(let j = 0; j < 4; j++){
            UpdateScreen();
            await sleep(updateFrequency);
        }

        await sleep(updateFrequency/2);

        for(let i = 0; i < enemies.length; i++){
            if(enemies[i].hit){
                enemies.splice(i, 1);
                i = 0;
            }
        }
    }

    sounds[2][0].play();
    context.drawImage(boomImg, 0, 0, 512, 384);
    await sleep(1000);
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(labelImg, 106, 0, 300, 384);
}

function UpdateScreen(){;
    context.drawImage(backgroundImg, 0, 0);

    for(let i = 0; i < enemies.length; i++){
        context.drawImage(enemies[i].image, enemies[i].hitBox[0], enemies[i].line - enemies[i].height, enemies[i].hitBox[1]- enemies[i].hitBox[0], enemies[i].height)

        if(enemies[i].state == EnemyState.hit){
            enemies[i].hit = true;
        }
    }

    if(currentGunFiringStatus == GunFiringState.Firing){
        context.drawImage(bulletHoleImg, currentGunPosition - 10, 191 - 41);
 
        context.drawImage(gunFireImg, 256-50, 384-100);
    }else if(currentGunFiringStatus == GunFiringState.Reloading){
       context.drawImage(gunReloadImg, 256-50, 384-100);
    }else{
        context.drawImage(gunCalmImg, 256-50, 384-100);
    }
}