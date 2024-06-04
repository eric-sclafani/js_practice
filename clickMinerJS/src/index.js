const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message");
const amountPerClick = $("#click-amount");
const shopOpenButton = $("#shop-open-button");
const shopCloseButton = $("#shop-close-button");
const shopDialog = $("#shop-dialog").get(0);
const shopItems = $("#shop-items");
let currentGemsCount = 0;
let gemsPerClick = 1;
const updateAndDisplayTimesClicked = () => {
    currentGemsCount++;
    $("#clicked").html(currentGemsCount.toString());
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
async function fetchStoreInventory(path) {
    const response = await fetch(path);
    return response.json();
}
const createShopItem = (itemText) => {
    const shopItem = document.createElement("li");
    shopItem.className = "shop-item";
    const shopItemText = document.createElement("div");
    shopItemText.innerHTML = itemText;
    shopItemText.className = "shop-item-text";
    const shopBuyButton = document.createElement("button");
    shopBuyButton.className = "shop-buy-button";
    shopBuyButton.innerHTML = "Buy";
    shopItem.append(shopItemText, shopBuyButton);
    return shopItem;
};
const addItemsToShopDisplay = (storeInventory) => {
    for (let item of storeInventory) {
        const inventoryItem = createShopItem(`Item name: ${item.name} Item Price: $${item.price}`);
        shopItems.append(inventoryItem);
    }
};
async function buildShopDisplay() {
    const storeInventory = await fetchStoreInventory("../data/storeInventory.json");
    addItemsToShopDisplay(storeInventory);
}
const updateGemsPerClickDisplay = () => {
    amountPerClick.html(gemsPerClick.toString());
};
const shopDialogHandler = () => {
    buildShopDisplay();
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
shopDialogHandler();
export {};
