//require the other js files
let models = require("./models");
let views = require("./views");
let types = require("./types");
let TaxiRouter = require("./router");


window.addEventListener("load", function () {
    //set up model
    let actualModel = new models.taxiModel();
    //set up views
    let playView = new views.playView({
        el: document.querySelector("#play"),
        model: actualModel,
    });

    let startView = new views.startView({
        el: document.querySelector("#home"),
        model: actualModel,
    });
    let loseView = new views.loseView({
        el: document.querySelector("#lose"),
        model: actualModel,
    });

    //set up routers
    let router = new TaxiRouter();

    // Whenever startView triggers a "startGame" event, run this
    // function.
    startView.on("startGame", function () {
        // Change URL to #play
        router.navigate("play", {trigger: true });
        console.log('starting');
    });
    //change URL to #lose
   actualModel.on("loseGame", function (){
        router.navigate("lose", {trigger: true});
    })

    router.on("route:goHome", function () {
        startView.el.classList.remove("hidden");
        playView.el.classList.add("hidden");
        loseView.el.classList.add("hidden");
    });

    router.on("route:playTime", function () {
        playView.el.classList.remove("hidden");
        startView.el.classList.add("hidden");
        loseView.el.classList.add("hidden");
    });

    router.on("route:losing", function () {
        playView.el.classList.add("hidden");
        startView.el.classList.add("hidden");
        loseView.el.classList.remove("hidden");
    });

    Backbone.history.start();
});