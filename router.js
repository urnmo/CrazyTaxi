module.exports = Backbone.Router.extend({
    initialize: function(){

    },
    routes: {
        'home': 'goHome',
        'play': 'playTime',
        'lose': 'losing',
    },

    goHome: function (){
        //show start page
        //hide the play view
        //hide the lose view
    },

    playTime: function(){
        //show the play page
        //hide the start page
        //hide the lose view

    },

    losing: function(){
        //show the lose page
        //hide the start page
        //hide the play page

    }
});