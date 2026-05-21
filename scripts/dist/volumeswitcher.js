var musicVolume = 0.5;
var soundVolume = 0.5;
function setMusicVolume(val) {
    musicVolume = val;
    for (var _i = 0, musics_1 = musics; _i < musics_1.length; _i++) {
        var m = musics_1[_i];
        m[0].volume = musicVolume * m[1];
    }
}
function setSoundVolume(val) {
    soundVolume = val;
    for (var _i = 0, sounds_1 = sounds; _i < sounds_1.length; _i++) {
        var s = sounds_1[_i];
        s[0].volume = musicVolume * s[1];
    }
}
window.setSoundVolume = setSoundVolume;
window.setMusicVolume = setMusicVolume;
