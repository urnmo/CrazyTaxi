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