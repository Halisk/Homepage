function turnOnIntro() {
    musics[1][0].pause();
    musics[1][0].currentTime = 0;
    musics[1][0].play();
}
function turnOffIntro() {
    musics[1][0].pause();
    musics[1][0].currentTime = 0;
}
window.turnOnIntro = turnOnIntro;
window.turnOffIntro = turnOffIntro;
