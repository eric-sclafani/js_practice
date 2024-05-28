

const clickRock = $("#click-rock")
const pickaxe = $("#pickaxe");





const animateUserClick = () => {
    clickRock.on('click', function () {

        pickaxe.addClass("rotate")
        setTimeout(() => {
            pickaxe.removeClass("rotate")
        }, 300)
    })
    
}

animateUserClick();