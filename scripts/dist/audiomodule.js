var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var musics = [];
var sounds = [];
var stageIntrosPlayed = [false, false, false, false,];
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
function runAudioLoop() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    musics[0][0].play();
                    _a.label = 1;
                case 1:
                    if (!(currentGameStatus === GameState.Running)) return [3 /*break*/, 3];
                    if (currentGunFiringStatus == GunFiringState.Firing) {
                        if (sounds[0][0].paused) {
                            sounds[0][0].play();
                        }
                    }
                    else {
                        sounds[0][0].pause();
                        sounds[0][0].currentTime = 0;
                    }
                    return [4 /*yield*/, sleep(500)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    stopAllSounds();
                    stopAllMusics();
                    return [2 /*return*/];
            }
        });
    });
}
function stopAllSounds() {
    for (var _i = 0, sounds_1 = sounds; _i < sounds_1.length; _i++) {
        var s = sounds_1[_i];
        s[0].pause();
        s[0].currentTime = 0;
    }
}
function stopAllMusics() {
    for (var _i = 0, musics_1 = musics; _i < musics_1.length; _i++) {
        var m = musics_1[_i];
        m[0].pause();
        m[0].currentTime = 0;
    }
}
