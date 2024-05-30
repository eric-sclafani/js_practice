


import { InventoryItem } from "../models/models.js"

const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message");

const shopOpenButton = $("#shop-open-button");
const shopCloseButton = $("#shop-close-button");

const shopDialog = $("#shop-dialog").get(0) as HTMLDialogElement;

let currentClickCount = 0;

const updateAndDisplayTimesClicked = (): void => {
    currentClickCount++
    $("#clicked").html(currentClickCount.toString());
}

const attachAnimation = (element:JQuery<HTMLElement>, className:string): void => {
    element.addClass(className);
        setTimeout(() => {
            element.removeClass(className);
        }, 300)
}

const playAudio = (path:string): void => {
    const audio = new Audio(path);
    audio.play();
}


const fetchStoreInventory = () => {
    
    
    fetch("../data/storeInventory.json")
    .then((response) => (response.json()))
    .then((json) => console.log(json))
}

const storeInventory: InventoryItem[] = [];



// Handlers


const dialogButtonsHandler = () => {

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

        playAudio("../assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();

    })
}





// Function calls

rockClickHandler();
dialogButtonsHandler();