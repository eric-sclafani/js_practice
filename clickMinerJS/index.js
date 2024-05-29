var clickRock = $("#rock");
var pickaxe = $("#pickaxe");
var clickMessage = $("#click-message");
var currentClickCount = 0;
var updateAndDisplayTimesClicked = function () {
    currentClickCount++;
    $("#clicked").html(currentClickCount.toString());
};
var attachAnimation = function (element, className) {
    element.addClass(className);
    setTimeout(function () {
        element.removeClass(className);
    }, 300);
};
var playAudio = function (path) {
    var audio = new Audio(path);
    audio.play();
};
var rockClickHandler = function () {
    clickRock.on('click', function () {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");
        playAudio("assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();
    });
};
rockClickHandler();
