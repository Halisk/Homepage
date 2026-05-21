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
var gameScreen = document.getElementById("game-screen");
var context = gameScreen.getContext("2d");
var updateFrequency = 200; // ms
var backgroundImg = new Image();
backgroundImg.src = "images/sprites/background.jpg";
var labelImg = new Image();
labelImg.src = "images/sprites/label.jpg";
var bulletHoleImg = new Image();
bulletHoleImg.src = "images/sprites/bullethole.png";
var gunCalmImg = new Image();
gunCalmImg.src = "images/sprites/gun_calm.png";
var gunFireImg = new Image();
gunFireImg.src = "images/sprites/gun_fire.png";
var gunReloadImg = new Image();
gunReloadImg.src = "images/sprites/gun_reload.png";
var boomImg = new Image();
boomImg.src = "images/sprites/boom.png";
window.addEventListener('load', function () {
    context.drawImage(backgroundImg, 0, 0);
    context.drawImage(labelImg, 106, 0, 300, 384);
});
function runScreenUpdaterLoop() {
    return __awaiter(this, void 0, Promise, function () {
        var j, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(currentGameStatus === GameState.Running)) return [3 /*break*/, 6];
                    j = 0;
                    _a.label = 1;
                case 1:
                    if (!(j < 4)) return [3 /*break*/, 4];
                    UpdateScreen();
                    return [4 /*yield*/, sleep(updateFrequency)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    j++;
                    return [3 /*break*/, 1];
                case 4: return [4 /*yield*/, sleep(updateFrequency / 2)];
                case 5:
                    _a.sent();
                    for (i = 0; i < enemies.length; i++) {
                        if (enemies[i].hit) {
                            enemies.splice(i, 1);
                            i = 0;
                        }
                    }
                    return [3 /*break*/, 0];
                case 6:
                    sounds[2][0].play();
                    context.drawImage(boomImg, 0, 0, 512, 384);
                    return [4 /*yield*/, sleep(1000)];
                case 7:
                    _a.sent();
                    context.drawImage(backgroundImg, 0, 0);
                    context.drawImage(labelImg, 106, 0, 300, 384);
                    return [2 /*return*/];
            }
        });
    });
}
function UpdateScreen() {
    ;
    context.drawImage(backgroundImg, 0, 0);
    for (var i = 0; i < enemies.length; i++) {
        context.drawImage(enemies[i].image, enemies[i].hitBox[0], enemies[i].line - enemies[i].height, enemies[i].hitBox[1] - enemies[i].hitBox[0], enemies[i].height);
        if (enemies[i].state == EnemyState.hit) {
            enemies[i].hit = true;
        }
    }
    if (currentGunFiringStatus == GunFiringState.Firing) {
        context.drawImage(bulletHoleImg, currentGunPosition - 10, 191 - 41);
        context.drawImage(gunFireImg, 256 - 50, 384 - 100);
    }
    else if (currentGunFiringStatus == GunFiringState.Reloading) {
        context.drawImage(gunReloadImg, 256 - 50, 384 - 100);
    }
    else {
        context.drawImage(gunCalmImg, 256 - 50, 384 - 100);
    }
}
