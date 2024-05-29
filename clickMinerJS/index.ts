

const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
const clickMessage = $("#click-message")
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

const playAudio = (path:string) => {
    const audio = new Audio(path);
    audio.play();
}


const rockClickHandler = (): void => {
    clickRock.on('click', () => {

    
    attachAnimation(pickaxe, "rotatePickaxe");
    attachAnimation(clickMessage, "slideInClickMessage");
    playAudio("assets/sfx/pickaxe-strikes-rock.mp3");
    updateAndDisplayTimesClicked();

        


    })
}



rockClickHandler();