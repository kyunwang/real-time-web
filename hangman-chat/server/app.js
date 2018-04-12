import express from 'express';

import path from 'path';
import bodyParser from 'body-parser';

const app = express();

import routes from './routes';



// Setting the view engine
app.set('view engine', 'pug')
	.set('views', './server/views');

// Set static route
app.use('/', express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(path.join(__dirname, '../public'), { maxAge: '31d' })); // This will cache the folder for 31days

// Use bodyparser
app.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }));


// Add global middleware available in templates and all routes
app.use((req, res, next) => {
	res.locals.h = 'Add helpers here';
	next();
});

app.use('/', routes);

export default app;