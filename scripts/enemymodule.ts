enum EnemyState {
    far = 0,
    mid = 1,
    close = 2,
    shoot = 3,
    hit = 4
}

enum EnemyHalfHitbox {
    far = 25,
    mid = 30,
    close = 35
}

enum EnemySpriteHeight {
    far = 70,
    mid = 80,
    close = 90
}

enum EnemySpriteY {
    far = 150,
    mid = 240,
    close = 300
}

var leftBorderEnemy: number = 50; //px
var rightBorderEnemy: number = 512 - 35; //px

const enemyRunImg = new Image();
enemyRunImg.src = "images/sprites/enemy_run.png";
const enemyAttackImg = new Image();
enemyAttackImg.src = "images/sprites/enemy_attack.png";
const enemyHitImg = new Image();
enemyHitImg.src = "images/sprites/enemy_hit.png";



var currentEnemyAppearingSpeed: number = 1000; // ms
var currentEnemyMovingSpeed: number = 1000; // ms
var enemies: Enemy[] = [];

async function runEnemyLoop(): Promise<void>{
    await sleep(2000);

    while(currentGameStatus === GameState.Running){
        enemies.push(new Enemy(Math.floor(Math.random() * (rightBorderEnemy - leftBorderEnemy + 1)) + leftBorderEnemy));
        enemies[enemies.length-1].run();

        await sleep(currentEnemyAppearingSpeed);
    }

    enemies = [];
}

class Enemy {
    position: number;
    state: EnemyState;
    hitBox: [leftBorder: number, rightBorder: number];
    height: number;
    hit: boolean;
    line: number;

    image: HTMLImageElement;

    public constructor(pos: number) {
        this.position = pos;
        this.state = EnemyState.far;
        this.hitBox = [pos - EnemyHalfHitbox.far, pos + EnemyHalfHitbox.far];
        this.height = EnemySpriteHeight.far;
        this.hit = false;
        this.line = EnemySpriteY.far;
        this.image = enemyRunImg;

        enemies.push(this);
    }

    shot(): boolean {
        if(currentGunPosition > this.hitBox[0] && currentGunPosition < this.hitBox[1]){
            return true;
        }
        return false;
    }

    async run(): Promise<void>{
        if(currentGameStatus == GameState.Running){
            for(let i = EnemyState.far; i <= EnemyState.shoot; i++){
                await sleep(currentEnemyMovingSpeed);

                if(this.state == EnemyState.hit){
                    this.image = enemyHitImg;
                    return;
                }

                if(i == EnemyState.far){
                    continue;
                }else if(i == EnemyState.mid){
                    this.hitBox = [this.position - EnemyHalfHitbox.mid, this.position + EnemyHalfHitbox.mid];
                    this.height = EnemySpriteHeight.mid;
                    this.line = EnemySpriteY.mid;
                }else if(i == EnemyState.close){
                    this.hitBox = [this.position - EnemyHalfHitbox.close, this.position + EnemyHalfHitbox.close];
                    this.height = EnemySpriteHeight.close;
                    this.line = EnemySpriteY.close;
                    this.image = enemyAttackImg;

                    sounds[Math.floor(Math.random() * (9 - 7 + 1)) + 7][0].play();

                    sleep(2000)
                }else if(i == EnemyState.shoot){
                    // show boom
                    // play boom
                    // return to default
                    window.currentGameStatus = GameState.Stopped;
                    enemies = [];
                }

                await sleep(currentEnemyMovingSpeed);
            }
        }
        else{
            return;
        }


    }
}

/*
    50+35 - левая граница
    512 - 50 - 35 - правая граница

    150 - 1ур 50 - ширина 70 - высота
    190 - 2ур 60 - ширина 80 - высота
    240 - 3ур 70 - ширина 90 - высота
*/