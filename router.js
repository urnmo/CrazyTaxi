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