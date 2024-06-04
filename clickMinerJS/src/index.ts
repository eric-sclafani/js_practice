
import { InventoryItem } from "../models/models.js";


const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message");
const amountPerClick = $("#click-amount")

const shopOpenButton = $("#shop-open-button");
const shopCloseButton = $("#shop-close-button");

const shopDialog = $("#shop-dialog").get(0) as HTMLDialogElement;
const shopItems = $("#shop-items");

let currentGemsCount = 0;
let gemsPerClick = 1;

const updateAndDisplayTimesClicked = (): void => {
    currentGemsCount++
    $("#clicked").html(currentGemsCount.toString());
}

const attachAnimation = (element: JQuery<HTMLElement>, className: string, delay: number = 300): void => {
    element.addClass(className);
    setTimeout(() => {
        element.removeClass(className);
    }, delay);
}

const playAudio = (path: string): void => {
    const audio = new Audio(path);
    audio.play();
}

const playPickaxeNoise = ():void => {

    function randomChoice(choices:Array<any>) {
        const index = Math.floor(Math.random() * choices.length);
        return choices[index];
    }

    const sfxPaths = [
        "../assets/sfx/pickaxe-striking-rock-1.mp3",
        "../assets/sfx/pickaxe-striking-rock-2.mp3",
        "../assets/sfx/pickaxe-striking-rock-3.mp3"
    ]
    const choice = randomChoice(sfxPaths); 
    console.log(choice);
    playAudio(choice);
}


async function fetchStoreInventory(path: string): Promise<InventoryItem[]> {
    const response = await fetch(path);
    return response.json();

}

const createShopItem = (itemText:string):HTMLLIElement => {
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
}

const addItemsToShopDisplay = (storeInventory: InventoryItem[]): void => {
    for (let item of storeInventory) {
        const inventoryItem = createShopItem(`${item.name} ${item.price}`);
        shopItems.append(inventoryItem);
    }
}

async function buildShopDisplay(): Promise<void> {
    const storeInventory = await fetchStoreInventory("../data/storeInventory.json");
    addItemsToShopDisplay(storeInventory);
}








const shopDialogHandler = () => {

    buildShopDisplay();
    shopOpenButton.on("click", () => {
        shopDialog.showModal();

    })

    shopCloseButton.on("click", () => {
        shopDialog.close();
    })

    


}

const rockClickHandler = (): void => {
    clickRock.on("click", () => {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");

        playPickaxeNoise();
        updateAndDisplayTimesClicked();

    })
}





rockClickHandler();
shopDialogHandler();