
import { InventoryItem } from "../models/models.js";


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

const attachAnimation = (element:JQuery<HTMLElement>, className:string, delay:number = 300): void => {
    element.addClass(className);
        setTimeout(() => {
            element.removeClass(className);
        }, delay);
}

const playAudio = (path:string): void => {
    const audio = new Audio(path);
    audio.play();
}


async function fetchStoreInventoryData(path:string): Promise<JSON> {
    const response = await fetch(path);
    return response.json();

}

const data = await fetchStoreInventoryData("../data/storeInventory.json");
console.log(data);







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



rockClickHandler();
dialogButtonsHandler();