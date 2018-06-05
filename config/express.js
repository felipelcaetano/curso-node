let express = require('express');
let load = require('express-load');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');

module.exports = function() {
    let app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    //A ordem dos middlewares importam muito
    //Verifica cada um dos formatos que está sendo recebido
    app.use(expressValidator());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    app.use((req, res, next) => {
        res.status(404).render('erros/404');
        next();
    });

    app.use((error, req, res, next) => {
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('erros/500');
            return;
        }
        next(error);
    });

    return app;
}