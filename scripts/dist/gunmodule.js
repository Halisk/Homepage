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
var GunFiringState;
(function (GunFiringState) {
    GunFiringState[GunFiringState["Idling"] = 0] = "Idling";
    GunFiringState[GunFiringState["Firing"] = 1] = "Firing";
    GunFiringState[GunFiringState["Reloading"] = 2] = "Reloading";
})(GunFiringState || (GunFiringState = {}));
var GunMovementState;
(function (GunMovementState) {
    GunMovementState[GunMovementState["Idle"] = 0] = "Idle";
    GunMovementState[GunMovementState["Left"] = 1] = "Left";
    GunMovementState[GunMovementState["Right"] = 2] = "Right";
})(GunMovementState || (GunMovementState = {}));
var heatingField = document.getElementById("heat-val");
var defaultGunPosition = 256;
var leftBorder = 50;
var rightBorder = 462;
var currentGunFiringStatus = GunFiringState.Idling;
var canFire = true;
var heatingPercent = 0;
var heatingIncreasingSpeed = 25; //ms
var heatingDecreasingSpeed = 50; //ms
var heatingRemovingSpeed = 3000; //ms
var currentMovingStatus = GunMovementState.Idle;
var currentGunPosition = defaultGunPosition; // in x of px;
var gunMovingSpeed = 5; //ms
window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.code == "Space") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentGunFiringStatus = GunFiringState.Firing;
            }
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.code == "Space") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentGunFiringStatus = GunFiringState.Idling;
            }
        }
    });
});
window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.code == "ArrowLeft") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentMovingStatus = GunMovementState.Left;
            }
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.code == "ArrowLeft") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentMovingStatus = GunMovementState.Idle;
            }
        }
    });
});
window.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (event) {
        if (event.code == "ArrowRight") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentMovingStatus = GunMovementState.Right;
            }
        }
    });
    document.addEventListener('keyup', function (event) {
        if (event.code == "ArrowRight") {
            event.preventDefault();
            if (currentGunFiringStatus != GunFiringState.Reloading) {
                currentMovingStatus = GunMovementState.Idle;
            }
        }
    });
});
function runGunFiringLoop() {
    return __awaiter(this, void 0, Promise, function () {
        var _a, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(currentGameStatus == GameState.Running)) return [3 /*break*/, 8];
                    _a = currentGunFiringStatus;
                    switch (_a) {
                        case GunFiringState.Idling: return [3 /*break*/, 1];
                        case GunFiringState.Firing: return [3 /*break*/, 3];
                        case GunFiringState.Reloading: return [3 /*break*/, 5];
                    }
                    return [3 /*break*/, 7];
                case 1: return [4 /*yield*/, decreaseHeat()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 3:
                    for (i = 0; i < enemies.length; i++) {
                        if (enemies[i].shot()) {
                            enemies[i].state = EnemyState.hit;
                            break;
                        }
                    }
                    return [4 /*yield*/, increaseHeat()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    sounds[1][0].play();
                    return [4 /*yield*/, removeHeat()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 0];
                case 8:
                    currentGunPosition = defaultGunPosition;
                    heatingPercent = 0;
                    currentMovingStatus = GunMovementState.Idle;
                    currentGunFiringStatus = GunFiringState.Idling;
                    return [2 /*return*/];
            }
        });
    });
}
function increaseHeat() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(heatingIncreasingSpeed)];
                case 1:
                    _a.sent();
                    if (heatingPercent < 100) {
                        heatingPercent++;
                        displayHeating();
                    }
                    else {
                        canFire = false;
                        currentGunFiringStatus = GunFiringState.Reloading;
                        displayHeating();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function decreaseHeat() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(heatingDecreasingSpeed)];
                case 1:
                    _a.sent();
                    if (heatingPercent > 0) {
                        heatingPercent--;
                        displayHeating();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function removeHeat() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(heatingRemovingSpeed)];
                case 1:
                    _a.sent();
                    currentGunPosition = defaultGunPosition;
                    heatingPercent = 0;
                    canFire = true;
                    currentGunFiringStatus = GunFiringState.Idling;
                    currentMovingStatus = GunMovementState.Idle;
                    displayHeating();
                    return [2 /*return*/];
            }
        });
    });
}
function displayHeating() {
    if (heatingPercent > 99) {
        heatingField.innerHTML = "REL";
        return;
    }
    else if (heatingPercent > 70) {
        heatingField.style.color = "red";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
    }
    else if (heatingPercent > 30) {
        heatingField.style.color = "yellow";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
    }
    else if (heatingPercent > 9) {
        heatingField.style.color = "white";
        heatingField.innerHTML = "&nbsp;" + heatingPercent.toString();
        return;
    }
    else {
        heatingField.style.color = "white";
        heatingField.innerHTML = "&nbsp;&nbsp;" + heatingPercent.toString();
    }
}
function runGunPositioningLoop() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(currentGameStatus == GameState.Running)) return [3 /*break*/, 2];
                    return [4 /*yield*/, sleep(gunMovingSpeed)];
                case 1:
                    _a.sent();
                    switch (currentMovingStatus) {
                        case GunMovementState.Idle:
                            break;
                        case GunMovementState.Left:
                            if (currentGunPosition > leftBorder) {
                                currentGunPosition--;
                            }
                            break;
                        case GunMovementState.Right:
                            if (currentGunPosition < rightBorder) {
                                currentGunPosition++;
                            }
                            break;
                    }
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
