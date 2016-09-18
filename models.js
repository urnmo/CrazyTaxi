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