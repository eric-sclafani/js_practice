var clickRock = $("#click-rock");
var pickaxe = $("#pickaxe");
var animateUserClick = function () {
    clickRock.on('click', function () {
        pickaxe.addClass("rotate");
        setTimeout(function () {
            pickaxe.removeClass("rotate");
        }, 300);
    });
};
animateUserClick();
