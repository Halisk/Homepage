
function turnOnIntro():void {
    musics[1][0].pause();
    musics[1][0].currentTime = 0;

    musics[1][0].play();
}

function turnOffIntro():void {
    musics[1][0].pause();
    musics[1][0].currentTime = 0;
}

(window as any).turnOnIntro = turnOnIntro;
(window as any).turnOffIntro = turnOffIntro;