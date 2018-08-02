import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import multer from 'multer';
import logger from 'morgan';

import compression from 'compression';
import express from 'express';
import path from 'path';

const app = express();
const PORT = (process.env.NODE_ENV === 'development') ? 3000 : 80;

// Set Localhost
const HOST = (process.env.NODE_ENV === 'development') ? 'localhost' : 'localhost';

// View Engine Setup
import hbs from 'express-handlebars';
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/public/layouts/'}));
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'hbs');

// Compress, parse, and log
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));

// Set up route handling
import index from './api/routes';
app.use('/', index);

// Server ON
app.listen(PORT, HOST, () => {
    console.log(`App listening on port ${PORT}!`);
});

// Catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    err.status = 404;
    next(err);
});

// Error Handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Handle the bugs somehow
app.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});

// Connect Database
import mongo from './system/database/mongo';
mongo(app);