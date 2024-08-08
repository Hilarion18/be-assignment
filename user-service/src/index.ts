process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config()
const server = require('./server');

const init = async () => {
	const fastify = await server();
	const port = process.env.PORT || 3000;
	fastify.listen({port, host: '0.0.0.0' }, (err, address) => {
		if (err) throw err;
		console.log(`fastify 🚀 server listening on ${address}`);
	});

	

	return fastify;
};

module.exports = init();
