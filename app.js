//require the other js files
let models = require('./models');
let views = require('./views');
let types = require('./types');
let router = require('./router');


window.addEventListener('load', function () {

    let actualModel = new models.taxiModel();

    let view = new views.taxiView({
        el: document.querySelector('body'),
        model: actualModel,
    });
});