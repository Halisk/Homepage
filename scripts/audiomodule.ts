var musics: [music: HTMLAudioElement, volumeMult: number][] = [];
var sounds: [sound: HTMLAudioElement, volumeMult: number][] = [];

var stageIntrosPlayed: boolean[]= [false,false,false,false,];

musics.push([new Audio("media/backgroundmusic.mp3"), 0.1]);
musics.push([new Audio("media/intro.mp3"), 1]);

sounds.push([new Audio("media/sounds/fire.ogg"), 1]);
sounds.push([new Audio("media/sounds/reload.ogg"), 1]);
sounds.push([new Audio("media/sounds/boom.mp3"), 1]);

sounds.push([new Audio("media/sounds/stage1.ogg"), 1]);
sounds.push([new Audio("media/sounds/stage2.ogg"), 1]);
sounds.push([new Audio("media/sounds/stage3.ogg"), 1]);
sounds.push([new Audio("media/sounds/stage4.ogg"), 1]);

sounds.push([new Audio("media/sounds/taunt1.ogg"), 1]);
sounds.push([new Audio("media/sounds/taunt2.ogg"), 1]);
sounds.push([new Audio("media/sounds/taunt3.ogg"), 1]);

setMusicVolume(0.5);
setSoundVolume(0.5);

// сделать сборку звуков не по классу, а по внутренней колекции, в т.ч. переделать volume switcher
// в конце пробежаться по коллекциям и выключить все звуки
async function runAudioLoop(): Promise<void>{    
    musics[0][0].play();

    while(currentGameStatus === GameState.Running){
        if(currentGunFiringStatus == GunFiringState.Firing){
            if(sounds[0][0].paused){
                sounds[0][0].play();
            }
        }else{
            sounds[0][0].pause();
            sounds[0][0].currentTime=0;
        }

        await sleep(500);
    }

    stopAllSounds();
    stopAllMusics();
}

function stopAllSounds(){
    for(let s of sounds){
        s[0].pause();
        s[0].currentTime=0;
    }
}

function stopAllMusics(){
    for(let m of musics){
        m[0].pause();
        m[0].currentTime=0;
    }
}