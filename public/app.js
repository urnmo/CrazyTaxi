(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./models":2,"./router":3,"./types":4,"./views":5}],2:[function(require,module,exports){
module.exports = {
    taxiModel: Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            username: "Finnequist Broadbottom",
            score: 0,
            fuel: 10,
            passY: Math.floor(Math.random() * 11),
            passX: Math.floor(Math.random() * 11),
            carName: 'string',
            mileage: 0,
            pickup: 0,
            sinceP: 0,

        },
        move: function (x, y) {
            this.set('username', document.querySelector('#user').value); //if no fuel: no score, no move, nada
            if (this.get("fuel") > 0 && this.get("x") > 0 && this.get("x") < 10 && this.get("y") > 0 && this.get("y") < 10) {
                this.set("x", this.get("x") + x)
                this.set("y", this.get("y") + y);
                this.set("fuel", this.get("fuel") - this.get('mileage'));
                this.set("score", this.get("score") + 1);
                this.set("sinceP", this.get('sinceP') + 1);
            }
            if (this.get('x') === this.get('passX') && this.get('y') === this.get('passY') && this.get('pickup') >= this.get('sinceP')) {
                this.set('fuel', this.get('fuel') + 10);
                this.set('sinceP', 0);
                this.set('passX', Math.floor(Math.random() * 11));
                this.set('passY', Math.floor(Math.random() * 11));
            }
            if (this.get('fuel') <= 0) {
                this.trigger('loseGame');
            }
        },
    })
} 
},{}],3:[function(require,module,exports){
module.exports = Backbone.Router.extend({
    initialize: function () {

    },
    routes: {
        // Left-hand side is the hash fragment of the URL
        // Right-hand side is the function that should be called AND also the routing event name
        "": "goHome",
        "home": "goHome",
        "play": "playTime",
        "lose": "losing",
    },

});
},{}],4:[function(require,module,exports){
// module.exports = {
//     // Vehicle: function (name, fuel, movement) {
//     //     this.fuel = amount;
//     //     this.name = name;
//     // }

//     // Array of Vehicles.
//     vehicles: [new Vehicle("Leadfoot Larry",), new Vehicle("Priscilla Prius")],
//     difficulties: [new Difficulty("Meh", 50), new Difficulty("Not so bad.", 20), new Difficulty("Wicked haaad.", 5),]
// };

// function Vehicle(name) {
//     this.name = name;
// }

// function Difficulty(type, fuel) {
//     this.type = type;
//     this.fuel = amount;
// }
},{}],5:[function(require,module,exports){
module.exports = {

    startView: Backbone.View.extend({
        initialize: function () {
            this.render();
            this.model.on('change', this.render, this)
        },
        events: {
            "click #startButt": "start",
        },
        //render all values set by up buttons

        //start game function
        start: function () {
            //and if a car is selected
            if (document.querySelector("#leadButt").checked) {
                this.model.set("carName", "Larry Leadfoot");
                this.model.set('mileage', 2);
                this.model.set('pickup', 0);
            } else if (document.querySelector("#priusButt").checked) {
                this.model.set("carName", "Priscilla Prius");
                this.model.set('mileage', 1);
                this.model.set('pickup', 0);
            }
            //if one of the difficulty levels is checked
            if (document.querySelector("#Easy").checked) {
                this.model.set("fuel", 20);
            } else if (document.querySelector("#Normal").checked) {
                this.model.set("fuel", 10);
            } else {
                this.model.set("fuel", 5);
            }            // and if a username is entered
            this.model.set("username", document.querySelector("#user").value);

            //then trigger the router
            this.trigger("startGame");
        },
    }),

    playView: Backbone.View.extend({
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        events: {
            "click #up": "moveDaCahUp",
            "click #right": "moveDaCahR",
            "click #down": "moveDaCahD",
            "click #left": "moveDaCahL",
            // "click #start": "startGame"
        },
        moveDaCahUp: function () {
            this.model.move(0, 1);
            console.log("move dammit");
        },
        moveDaCahR: function () {
            this.model.move(1, 0);
            console.log("move dammit");
        },
        moveDaCahD: function () {
            this.model.move(0, -1);
            console.log("move dammit");
        },
        moveDaCahL: function () {
            this.model.move(-1, 0);
            console.log("move dammit");
        },

    }),

    // loseView:
    loseView: Backbone.View.extend({
        initialize: function () {
            this.render();
            this.model.on("change", this.render, this);
        },
        events: {},

        render: function () {
            document.querySelector("#loseMsg");
            document.querySelector("#startOver");
        },

    }),
}

},{}]},{},[1])