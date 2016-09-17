module.exports = {
    playView: Backbone.View.extend({
        initialize: function () {
            this.model.on("change", this.render, this);
        },
        events: {
            "click #up": "moveDaCahUp",
            "click #right": "moveDaCahR",
            "click #down": "moveDaCahD",
            "click #left": "moveDaCahL",
            "click #start": "startGame"
        },
        moveDaCahUp: function () {
            this.model.move(0, 1);
        },
        moveDaCahR: function () {
            this.model.move(1, 0);
            console.log("move dammit");
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
            "click #startButt": "start",
        },
        //render all values set by up buttons

        //         render: function () {
        //             console.log(this.model.get("y"));
        //             console.log(this.model.get("fuel"));
        //             console.log(this.model.get("score"));
        //         }
        //     })
        // }



        //start game function
        start: function () {
            //and if a car is selected
            if (document.querySelector("#leadButt").checked) {
                this.model.set("carName", "Larry Leadfoot");
            } else if (document.querySelector("#priusButt").checked) {
                this.model.set("carName", "Priscilla Prius");
            }
            //if one of the difficulty levels is checked
            if (document.querySelector("#Easy").checked) {
                this.model.set("fuel", 50);
            } else if (document.querySelector("#Normal").checked) {
                this.model.set("fuel", 20);
            } else {
                this.model.set("fuel", 5);
            }            // and if a username is entered
            this.model.set("username", document.querySelector("#user").value);


            //then trigger the router
            this.trigger("start");
        },//maybe game over function
    }),
    // loseView:
loseView: Backbone.View.extend({
        initialize: function () {
            this.model.on("change", this.render, this);
        },
    events:{
        
    }


}),

