var musicVolume: number = 0.5;
var soundVolume: number = 0.5;

function setMusicVolume(val: number): void{
    musicVolume = val;

    for(var m of musics){
        m[0].volume = musicVolume * m[1];
    }
}

function setSoundVolume(val: number): void{
    soundVolume = val;

    for(var s of sounds){
        s[0].volume = musicVolume * s[1];
    }
}


(window as any).setSoundVolume = setSoundVolume;
(window as any).setMusicVolume = setMusicVolume;