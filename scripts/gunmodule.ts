enum GunFiringState {
    Idling,
    Firing,
    Reloading
}

enum GunMovementState {
    Idle,
    Left,
    Right
}

const heatingField = document.getElementById("heat-val")!;
const defaultGunPosition: number = 256;
const leftBorder:number = 50;
const rightBorder:number = 462;

var currentGunFiringStatus: GunFiringState = GunFiringState.Idling;
var canFire: boolean = true;
var heatingPercent: number = 0;

var heatingIncreasingSpeed: number = 25; //ms
var heatingDecreasingSpeed: number = 50; //ms
var heatingRemovingSpeed: number = 3000; //ms

var currentMovingStatus = GunMovementState.Idle;
var currentGunPosition: number = defaultGunPosition; // in x of px;
var gunMovingSpeed: number = 5; //ms

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code == "Space") {
            
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentGunFiringStatus = GunFiringState.Firing;
            }
        }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.code == "Space") {
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentGunFiringStatus = GunFiringState.Idling;
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code == "ArrowLeft") {
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentMovingStatus = GunMovementState.Left;
            }
        }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.code == "ArrowLeft") {
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentMovingStatus = GunMovementState.Idle;
            }
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code == "ArrowRight") {
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentMovingStatus = GunMovementState.Right;
            }
        }
    });

    document.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.code == "ArrowRight") {
            event.preventDefault();

            if(currentGunFiringStatus != GunFiringState.Reloading){
                currentMovingStatus = GunMovementState.Idle;
            }
        }
    });
});


async function runGunFiringLoop(): Promise<void>{
    while(currentGameStatus == GameState.Running){
        switch(currentGunFiringStatus){
            case GunFiringState.Idling:
                await decreaseHeat();
                break;
            case GunFiringState.Firing:
                for(let i = 0; i < enemies.length; i++){
                    if(enemies[i].shot()){
                        enemies[i].state = EnemyState.hit;

                        break;
                    }
                }
                await increaseHeat();
                break;
            case GunFiringState.Reloading:
                sounds[1][0].play();
                await removeHeat();
                break;
        }
    }

    currentGunPosition = defaultGunPosition;
    heatingPercent = 0;
    currentMovingStatus = GunMovementState.Idle;
    currentGunFiringStatus = GunFiringState.Idling;
}

async function increaseHeat(): Promise<void> {
    await sleep(heatingIncreasingSpeed);

    if(heatingPercent < 100){
        heatingPercent++;
        displayHeating();
    }else{
        canFire = false;
        currentGunFiringStatus = GunFiringState.Reloading;
        displayHeating();
    }
}

async function decreaseHeat(): Promise<void> {
    await sleep(heatingDecreasingSpeed);

    if(heatingPercent > 0){
        heatingPercent--;
        displayHeating();
    }
}

async function removeHeat(): Promise<void>{
    await sleep(heatingRemovingSpeed);

    currentGunPosition = defaultGunPosition;
    heatingPercent = 0;
    canFire = true;
    currentGunFiringStatus = GunFiringState.Idling;
    currentMovingStatus = GunMovementState.Idle;

    displayHeating();
} 

function displayHeating(): void {
    if(heatingPercent > 99){
        heatingField.innerHTML = "REL";
        return;
    }
    else if(heatingPercent > 70){
        heatingField.style.color = "red";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
    }
    else if(heatingPercent > 30){
        heatingField.style.color = "yellow";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
    }
    else if(heatingPercent > 9){
        heatingField.style.color = "white";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
        return;
    }else{
        heatingField.style.color = "white";
        heatingField.innerHTML = "&nbsp;&nbsp;" + heatingPercent.toString();
    }
}

async function runGunPositioningLoop(): Promise<void>{
    while(currentGameStatus == GameState.Running){
        await sleep(gunMovingSpeed);

        switch(currentMovingStatus){
            case GunMovementState.Idle:
                break;
            case GunMovementState.Left:
                if(currentGunPosition > leftBorder){
                    currentGunPosition--;
                }
                break;
            case GunMovementState.Right:
                if(currentGunPosition < rightBorder){
                    currentGunPosition++;
                }
                break;
        }
    }
}