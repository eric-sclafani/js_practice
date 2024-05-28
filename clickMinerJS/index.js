var clickRock = $("#rock");
var pickaxe = $("#pickaxe");
var currentClickCount = 0;
var updateAndDisplayTimesClicked = function () {
    currentClickCount++;
    $("#clicked").html(currentClickCount.toString());
};
var animatePickaxe = function () {
    pickaxe.addClass("rotate");
    setTimeout(function () {
        pickaxe.removeClass("rotate");
    }, 300);
};
var playAudio = function (path) {
    var audio = new Audio(path);
    audio.play();
};
var rockOnClickHandler = function () {
    clickRock.on('click', function () {
        animatePickaxe();
        playAudio("assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();
    });
};
rockOnClickHandler();
