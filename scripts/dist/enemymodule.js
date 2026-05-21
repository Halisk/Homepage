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
var EnemyState;
(function (EnemyState) {
    EnemyState[EnemyState["far"] = 0] = "far";
    EnemyState[EnemyState["mid"] = 1] = "mid";
    EnemyState[EnemyState["close"] = 2] = "close";
    EnemyState[EnemyState["shoot"] = 3] = "shoot";
    EnemyState[EnemyState["hit"] = 4] = "hit";
})(EnemyState || (EnemyState = {}));
var EnemyHalfHitbox;
(function (EnemyHalfHitbox) {
    EnemyHalfHitbox[EnemyHalfHitbox["far"] = 25] = "far";
    EnemyHalfHitbox[EnemyHalfHitbox["mid"] = 30] = "mid";
    EnemyHalfHitbox[EnemyHalfHitbox["close"] = 35] = "close";
})(EnemyHalfHitbox || (EnemyHalfHitbox = {}));
var EnemySpriteHeight;
(function (EnemySpriteHeight) {
    EnemySpriteHeight[EnemySpriteHeight["far"] = 70] = "far";
    EnemySpriteHeight[EnemySpriteHeight["mid"] = 80] = "mid";
    EnemySpriteHeight[EnemySpriteHeight["close"] = 90] = "close";
})(EnemySpriteHeight || (EnemySpriteHeight = {}));
var EnemySpriteY;
(function (EnemySpriteY) {
    EnemySpriteY[EnemySpriteY["far"] = 150] = "far";
    EnemySpriteY[EnemySpriteY["mid"] = 240] = "mid";
    EnemySpriteY[EnemySpriteY["close"] = 300] = "close";
})(EnemySpriteY || (EnemySpriteY = {}));
var leftBorderEnemy = 50; //px
var rightBorderEnemy = 512 - 35; //px
var enemyRunImg = new Image();
enemyRunImg.src = "images/sprites/enemy_run.png";
var enemyAttackImg = new Image();
enemyAttackImg.src = "images/sprites/enemy_attack.png";
var enemyHitImg = new Image();
enemyHitImg.src = "images/sprites/enemy_hit.png";
var currentEnemyAppearingSpeed = 1000; // ms
var currentEnemyMovingSpeed = 1000; // ms
var enemies = [];
function runEnemyLoop() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(2000)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(currentGameStatus === GameState.Running)) return [3 /*break*/, 4];
                    enemies.push(new Enemy(Math.floor(Math.random() * (rightBorderEnemy - leftBorderEnemy + 1)) + leftBorderEnemy));
                    enemies[enemies.length - 1].run();
                    return [4 /*yield*/, sleep(currentEnemyAppearingSpeed)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    enemies = [];
                    return [2 /*return*/];
            }
        });
    });
}
var Enemy = /** @class */ (function () {
    function Enemy(pos) {
        this.position = pos;
        this.state = EnemyState.far;
        this.hitBox = [pos - EnemyHalfHitbox.far, pos + EnemyHalfHitbox.far];
        this.height = EnemySpriteHeight.far;
        this.hit = false;
        this.line = EnemySpriteY.far;
        this.image = enemyRunImg;
        enemies.push(this);
    }
    Enemy.prototype.shot = function () {
        if (currentGunPosition > this.hitBox[0] && currentGunPosition < this.hitBox[1]) {
            return true;
        }
        return false;
    };
    Enemy.prototype.run = function () {
        return __awaiter(this, void 0, Promise, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(currentGameStatus == GameState.Running)) return [3 /*break*/, 6];
                        i = EnemyState.far;
                        _a.label = 1;
                    case 1:
                        if (!(i <= EnemyState.shoot)) return [3 /*break*/, 5];
                        return [4 /*yield*/, sleep(currentEnemyMovingSpeed)];
                    case 2:
                        _a.sent();
                        if (this.state == EnemyState.hit) {
                            this.image = enemyHitImg;
                            return [2 /*return*/];
                        }
                        if (i == EnemyState.far) {
                            return [3 /*break*/, 4];
                        }
                        else if (i == EnemyState.mid) {
                            this.hitBox = [this.position - EnemyHalfHitbox.mid, this.position + EnemyHalfHitbox.mid];
                            this.height = EnemySpriteHeight.mid;
                            this.line = EnemySpriteY.mid;
                        }
                        else if (i == EnemyState.close) {
                            this.hitBox = [this.position - EnemyHalfHitbox.close, this.position + EnemyHalfHitbox.close];
                            this.height = EnemySpriteHeight.close;
                            this.line = EnemySpriteY.close;
                            this.image = enemyAttackImg;
                            sounds[Math.floor(Math.random() * (9 - 7 + 1)) + 7][0].play();
                            sleep(2000);
                        }
                        else if (i == EnemyState.shoot) {
                            // show boom
                            // play boom
                            // return to default
                            window.currentGameStatus = GameState.Stopped;
                            enemies = [];
                        }
                        return [4 /*yield*/, sleep(currentEnemyMovingSpeed)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return Enemy;
}());
/*
    50+35 - левая граница
    512 - 50 - 35 - правая граница

    150 - 1ур 50 - ширина 70 - высота
    190 - 2ур 60 - ширина 80 - высота
    240 - 3ур 70 - ширина 90 - высота
*/ 
