"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clickRock = $("#rock");
var pickaxe = $("#pickaxe");
var clickMessage = $("#click-message");
var shopOpenButton = $("#shop-open-button");
var shopCloseButton = $("#shop-close-button");
var shopDialog = $("#shop-dialog").get(0);
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
var fetchStoreInventory = function () {
    fetch("data/storeInventory.json")
        .then(function (response) { return (response.json()); })
        .then(function (json) { return console.log(json); });
};
var storeInventory = [];
// Handlers
var dialogButtonsHandler = function () {
    shopOpenButton.on("click", function () {
        shopDialog.showModal();
    });
    shopCloseButton.on("click", function () {
        shopDialog.close();
    });
};
var rockClickHandler = function () {
    clickRock.on("click", function () {
        attachAnimation(pickaxe, "rotatePickaxe");
        attachAnimation(clickMessage, "slideInClickMessage");
        playAudio("assets/sfx/pickaxe-strikes-rock.mp3");
        updateAndDisplayTimesClicked();
    });
};
// Function calls
rockClickHandler();
dialogButtonsHandler();
