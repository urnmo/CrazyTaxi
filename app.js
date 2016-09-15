//require the other js files
let models = require('./models');
let views = require('./views');


// //set up taxi model with required information
// let taxiModel = Backbone.Model.extend({
//     defaults: {
//         x: 0,
//         y: 0,
//         username: 'Finnequist Broadbottom',
//         score: 100,
//         fuel: 2,
//         passY: 1,
//         passyX: 1,
//     },

//     move: function (x, y) {
//         //if no fuel: no score, no move, nada
//         if (this.get('fuel') > 0 && this.get('x') > 0 && this.get('x') < 10 && this.get('y') > 0 && this.get('y') < 10) {
//             this.set('x', this.get('x') + x)
//             this.set('y', this.get('y') + y);
//             this.set('fuel', this.get('fuel') - 1);
//             this.set('score', this.get('score') + 1);
//         }
//     }//maybe game over function
// });
// //set up taxi view for clicking on buttons

// let taxiView = Backbone.View.extend({
//     initialize: function () {
//         this.model.on('change', this.render, this);
//     },
//     events: {
//         'click #up': 'moveDaCahUp',
//         'click #right': 'moveDaCahR',
//         'click #down': 'moveDaCahD',
//         'click #left': 'moveDaCahL',
//     },
//     //add 1 to y, subtract 1 fuel, and increase score by 1
//     moveDaCahUp: function () {
//         this.model.move(0, 1);
//         // this.model.set('y', this.model.get('y') + 1);
//         // this.model.set('fuel', this.model.get('fuel') - 1);
//         // this.model.set('score', this.model.get('score') + 1);
//     },
//     //add one to x, subtract 1 fuel, and increase score by 1
//     moveDaCahR: function () {
//         this.model.move(1, 0);
//         // this.model.set('y', this.model.get('x') + 1);
//         // this.model.set('fuel', this.model.get('fuel') - 1);
//         // this.model.set('score', this.model.get('score') + 1);
//     },
//     //subtract one from y, subtract 1 fuel, and increase score by 1
//     moveDaCahD: function () {
//         this.model.move(0, -1);
//         // this.model.set('y', this.model.get('y') - 1);
//         // this.model.set('fuel', this.model.get('fuel') - 1);
//         // this.model.set('score', this.model.get('score') + 1);
//     },
//     //subtract one from y, subtract 1 fuel, and increase score by 1
//     moveDaCahL: function () {
//         this.model.move(-1, 0);
//         // this.model.set('x', this.model.get('x') - 1);
//         // this.model.set('fuel', this.model.get('fuel') - 1);
//         // this.model.set('score', this.model.get('score') + 1);
//     },
//     //render all values set by up buttons

//     render: function () {
//         console.log(this.model.get('y'));
//         console.log(this.model.get('fuel'));
//         console.log(this.model.get('score'));
//     }
// });

window.addEventListener('load', function () {

    let actualModel = new models.taxiModel();

    let view = new views.taxiView({
        el: document.querySelector('body'),
        model: actualModel,
    });
});