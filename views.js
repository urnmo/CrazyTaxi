module.exports = {
    taxiView: Backbone.View.extend({
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


        //start game function

        //render all values set by up buttons

        render: function () {
            console.log(this.model.get('y'));
            console.log(this.model.get('fuel'));
            console.log(this.model.get('score'));
        }
    })
}