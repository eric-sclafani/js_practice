
import { InventoryItem } from "../models/models.js";


const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message");

const shopOpenButton = $("#shop-open-button");
const shopCloseButton = $("#shop-close-button");

const shopDialog = $("#shop-dialog").get(0) as HTMLDialogElement;
const shopItems = $("#shop-items");

let currentClickCount = 0;

const updateAndDisplayTimesClicked = (): void => {
    currentClickCount++
    $("#clicked").html(currentClickCount.toString());
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


async function fetchStoreInventory(path: string): Promise<InventoryItem[]> {
    const response = await fetch(path);
    return response.json();

}

const createShopItem = (item: InventoryItem, itemText:string):HTMLLIElement => {
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
        const inventoryItem = createShopItem(item, `Item name: ${item.name} Item Price: $${item.price}`);
        shopItems.append(inventoryItem);
    }
}


async function displayShopItems(): Promise<void> {
    const storeInventory = await fetchStoreInventory("../data/storeInventory.json");
    addItemsToShopDisplay(storeInventory);
}




const dialogButtonsHandler = () => {

    shopOpenButton.on("click", () => {
        displayShopItems();
        shopDialog.showModal();

    })

    shopCloseButton.on("click", () => {

        shopDialog.close();
        shopItems.empty(); // removes shop items from modal
    })
}

const rockClickHandler = (): void => {
    clickRock.on("click", () => {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");

        playAudio("../assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();

    })
}



rockClickHandler();
dialogButtonsHandler();