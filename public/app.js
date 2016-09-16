(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require the other js files
let models = require('./models');
let views = require('./views');
let types = require('./types');
let TaxiRouter = require('./router');


window.addEventListener('load', function () {
    //set up model
    let actualModel = new models.taxiModel();
    //set up views
    let playView = new views.playView({
        el: document.querySelector('#play'),
        model: actualModel,
    });

    let startView = new views.startView({
        el: document.querySelector('#home'),
        model: actualModel,
    });
    // let loseView = new views.loseView({
    //     el: document.querySelector('#lose'),
    //     model: actualModel,
    // });

    //set up routers
    let router = new TaxiRouter();

    // Whenever startView triggers a 'startGame' event, run this
    // function.
    startView.on('startGame', function () {
        // Change URL to #play
        router.navigate('play', { trigger: true });
    });

    router.on('route:goHome', function () {
        startView.el.classList.remove('hidden');
        playView.el.classList.add('hidden');
        // loseView.el.classlist.add('hidden');
    });

    router.on('route:playTime', function () {
        playView.el.classList.remove('hidden');
        startView.el.classList.add('hidden');
        // loseView.el.classlist.add('hidden');
    });

    // router.on('route:losing', function () {
    //     playView.el.classlist.add('hidden');
    //     startView.el.classlist.add('hidden');
    //     loseView.el.classlist.remove('hidden');
    // });

    Backbone.history.start();
});
},{"./models":2,"./router":3,"./types":4,"./views":5}],2:[function(require,module,exports){
module.exports = {
    taxiModel: Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            username: 'Finnequist Broadbottom',
            score: 0,
            fuel: 0,
            passY: 10,
            passyX: 10,
            carName: 'Leadbutt'
        },
        move: function (x, y) {
            //if no fuel: no score, no move, nada
            if (this.get('fuel') > 0 && this.get('x') > 0 && this.get('x') < 10 && this.get('y') > 0 && this.get('y') < 10) {
                this.set('x', this.get('x') + x)
                this.set('y', this.get('y') + y);
                this.set('fuel', this.get('fuel') - 1);
                this.set('score', this.get('score') + 1);
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
        '': 'goHome',
        'home': 'goHome',
        'play': 'playTime',
        'lose': 'losing',
    },

    goHome: function () {
        //show start page
        //hide the play view
        //hide the lose view
    },

    playTime: function () {
        //show the play page
        //hide the start page
        //hide the lose view

    },

    losing: function () {
        //show the lose page
        //hide the start page
        //hide the play page

    }
});
},{}],4:[function(require,module,exports){
// module.exports = {
//     // Vehicle: function (name, fuel, movement) {
//     //     this.fuel = amount;
//     //     this.name = name;
//     // }

//     // Array of Vehicles.
//     vehicles: [new Vehicle('Leadfoot Larry',), new Vehicle('Priscilla Prius')],
//     difficulties: [new Difficulty('Meh', 50), new Difficulty('Not so bad.', 20), new Difficulty("Wicked haaad.", 5),]
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
    playView: Backbone.View.extend({
        initialize: function () {
            this.model.on('change', this.render, this);
        },
        events: {
            'click #up': 'moveDaCahUp',
            'click #right': 'moveDaCahR',
            'click #down': 'moveDaCahD',
            'click #left': 'moveDaCahL',
            'click #start': 'startGame'
        },
        moveDaCahUp: function () {
            this.model.move(0, 1);
        },
        moveDaCahR: function () {
            this.model.move(1, 0);
            console.log('move dammit');
        },
        moveDaCahD: function () {
            this.model.move(0, -1);
        },
        moveDaCahL: function () {
            this.model.move(-1, 0);
        },
        startGame: function () {
            this.model.start();
        },

    }),

    startView: Backbone.View.extend({
        initialize: function () {

        },
        events: {
            'click #startButt': 'start',
        },
        //render all values set by up buttons

        //         render: function () {
        //             console.log(this.model.get('y'));
        //             console.log(this.model.get('fuel'));
        //             console.log(this.model.get('score'));
        //         }
        //     })
        // }



        //start game function
        start: function () {
            //and if a car is selected
            if (document.querySelector('#leadButt').checked) {
                this.model.set('carName', "Larry Leadfoot");
            } else if (document.querySelector('#priusButt').checked) {
                this.model.set('carName', "Priscilla Prius");
            }
            //if one of the difficulty levels is checked
            if (document.querySelector('#Easy').checked) {
                this.model.set('fuel', 50);
            } else if (document.querySelector('#Normal').checked) {
                this.model.set('fuel', 20);
            } else {
                this.model.set('fuel', 5);
            }            // and if a username is entered
            this.model.set('username', document.querySelector('#user').value);


            //then trigger the router
            this.trigger('startGame');
        },//maybe game over function
    }),

    // loseView:

};


},{}]},{},[1])