module.exports = {
    taxiModel: Backbone.Model.extend({
        defaults: {
            x: 0,
            y: 0,
            username: "Finnequist Broadbottom",
            score: 0,
            fuel: 0,
            passY: 10,
            passyX: 10,
            carName: "Leadbutt"
        },
        move: function (x, y) {
            //if no fuel: no score, no move, nada
            if (this.get("fuel") > 0 && this.get("x") > 0 && this.get("x") < 10 && this.get("y") > 0 && this.get("y") < 10) {
                this.set("x", this.get("x") + x)
                this.set("y", this.get("y") + y);
                this.set("fuel", this.get("fuel") - 1);
                this.set("score", this.get("score") + 1);
            }
        },
    })
} 