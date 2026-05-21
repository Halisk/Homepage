
var tabs: [sideHeader: HTMLLIElement, note: HTMLElement][] = [];

function tieSideHeadersAndNotes() {
    let allSideHeaders: HTMLCollectionOf<HTMLLIElement> = document.getElementsByTagName("li");
    let allNotes: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName("section");

    for (let i = 0; i < allSideHeaders.length; i++) {
        tabs.push([allSideHeaders[i], allNotes[i]]);
    }
}

function switchTab(currentTab: HTMLElement): void {
    for(const tab of (window as any).tabs){
        if (tab[0] === currentTab) {
            tab[0].classList.add("selected-tab");
            tab[0].classList.remove("deselected-tab");

            tab[1].classList.add("selected-tab");
            tab[1].classList.remove("deselected-tab");
        } else {
            tab[0].classList.remove("selected-tab");
            tab[0].classList.add("deselected-tab");

            tab[1].classList.remove("selected-tab");
            tab[1].classList.add("deselected-tab");
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    tieSideHeadersAndNotes();
});

(window as any).tieSideHeadersAndNotes = tieSideHeadersAndNotes;
(window as any).switchTab = switchTab;