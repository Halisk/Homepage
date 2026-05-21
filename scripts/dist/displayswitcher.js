var tabs = [];
function tieSideHeadersAndNotes() {
    var allSideHeaders = document.getElementsByTagName("li");
    var allNotes = document.getElementsByTagName("section");
    for (var i = 0; i < allSideHeaders.length; i++) {
        tabs.push([allSideHeaders[i], allNotes[i]]);
    }
}
function switchTab(currentTab) {
    for (var _i = 0, _a = window.tabs; _i < _a.length; _i++) {
        var tab = _a[_i];
        if (tab[0] === currentTab) {
            tab[0].classList.add("selected-tab");
            tab[0].classList.remove("deselected-tab");
            tab[1].classList.add("selected-tab");
            tab[1].classList.remove("deselected-tab");
        }
        else {
            tab[0].classList.remove("selected-tab");
            tab[0].classList.add("deselected-tab");
            tab[1].classList.remove("selected-tab");
            tab[1].classList.add("deselected-tab");
        }
    }
}
window.addEventListener('DOMContentLoaded', function () {
    tieSideHeadersAndNotes();
});
window.tieSideHeadersAndNotes = tieSideHeadersAndNotes;
window.switchTab = switchTab;
