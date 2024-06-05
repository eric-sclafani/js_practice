let playerGemsCount = 0;
const playerUpgrades = [];
const updateAndDisplayTimesClicked = () => {
    playerGemsCount++;
    $("#clicked").html(playerGemsCount.toString());
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
const playPickaxeNoise = () => {
    function randomChoice(choices) {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }
    const sfxPaths = [
        "../assets/sfx/pickaxe-striking-rock-1.mp3",
        "../assets/sfx/pickaxe-striking-rock-2.mp3",
        "../assets/sfx/pickaxe-striking-rock-3.mp3"
    ];
    const choice = randomChoice(sfxPaths);
    playAudio(choice);
};
async function fetchStoreInventory(path) {
    const response = await fetch(path);
    return response.json();
}
const createShopItem = (item) => {
    const shopItem = document.createElement("li");
    shopItem.className = "shop-item";
    const shopItemText = document.createElement("div");
    shopItemText.innerHTML = `${item.name} ${item.price} `;
    shopItemText.className = "shop-item-text";
    const shopBuyButton = document.createElement("button");
    shopBuyButton.className = "shop-buy-button";
    shopBuyButton.innerHTML = "Buy";
    shopBuyButton.value = item.name;
    shopItem.append(shopItemText, shopBuyButton);
    return shopItem;
};
const addItemsToShopDisplay = (storeInventory) => {
    const shopItems = $("#shop-items");
    for (let item of storeInventory) {
        const inventoryItem = createShopItem(item);
        shopItems.append(inventoryItem);
    }
};
async function buildShopDisplay() {
    const storeInventory = await fetchStoreInventory("../data/storeInventory.json");
    addItemsToShopDisplay(storeInventory);
}
async function shopDialogHandler() {
    await buildShopDisplay();
    const shopOpenButton = $("#shop-open-button");
    const shopCloseButton = $("#shop-close-button");
    const shopDialog = $("#shop-dialog").get(0);
    const shopBuyButton = $(".shop-buy-button");
    $("html").on("keydown", (event) => {
        if (event.key == "s") {
            shopDialog.showModal();
        }
    });
    shopOpenButton.on("click", () => {
        shopDialog.showModal();
    });
    shopCloseButton.on("click", () => {
        shopDialog.close();
    });
}
const rockClickHandler = () => {
    const clickRock = $("#rock");
    const pickaxe = $("#pickaxe");
    const clickMessage = $("#click-message");
    clickRock.on("click", () => {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");
        playPickaxeNoise();
        updateAndDisplayTimesClicked();
    });
};
rockClickHandler();
shopDialogHandler();
export {};
