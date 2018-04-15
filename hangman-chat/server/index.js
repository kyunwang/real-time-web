require('dotenv').config({ path: './vars.env' });

import app from './app';
import io from './chatSockets';

const server = app.listen(process.env.PORT, function () {
	console.log('Listening to port: ', process.env.PORT);
});

io.listen(server);

export default server;