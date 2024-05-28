

const clickRock = $("#rock");
const pickaxe = $("#pickaxe");
let currentClickCount = 0;

const updateAndDisplayTimesClicked = (): void => {
    currentClickCount++
    $("#clicked").html(currentClickCount.toString());
}

const animatePickaxe = (): void => {
    pickaxe.addClass("rotate");
        setTimeout(() => {
            pickaxe.removeClass("rotate");
        }, 300)
}

const playAudio = (path:string) => {
    const audio = new Audio(path);
    audio.play();
}


const rockOnClickHandler = (): void => {
    clickRock.on('click', function () {

    animatePickaxe();
    playAudio("assets/sfx/pickaxe-strikes-rock.mp3")
    updateAndDisplayTimesClicked();

        

        

    })
}



rockOnClickHandler();