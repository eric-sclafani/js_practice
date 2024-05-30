const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message");
const shopOpenButton = $("#shop-open-button");
const shopCloseButton = $("#shop-close-button");
const shopDialog = $("#shop-dialog").get(0);
let currentClickCount = 0;
const updateAndDisplayTimesClicked = () => {
    currentClickCount++;
    $("#clicked").html(currentClickCount.toString());
};
const attachAnimation = (element, className, delay = 300) => {
    element.addClass(className);
    setTimeout(() => {
        element.removeClass(className);
    }, delay);
};
const playAudio = (path) => {
    const audio = new Audio(path);
    audio.play();
};
async function fetchStoreInventoryData(path) {
    const response = await fetch(path);
    return response.json();
}
const data = await fetchStoreInventoryData("../data/storeInventory.json");
console.log(data);
const dialogButtonsHandler = () => {
    shopOpenButton.on("click", () => {
        shopDialog.showModal();
    });
    shopCloseButton.on("click", () => {
        shopDialog.close();
    });
};
const rockClickHandler = () => {
    clickRock.on("click", () => {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");
        playAudio("../assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();
    });
};
rockClickHandler();
dialogButtonsHandler();
export {};
