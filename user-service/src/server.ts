const fastify = require('fastify')();
const db = require('../src/config/db');

const createServer  = async () => {

	// await db(fastify);

	await fastify.register(require('fastify-cors'));
  
	await fastify.register(require('../src/routes/user'), { prefix: '/user' });
	await fastify.register(require('../src/routes/transaction'), { prefix: '/transaction' });

	fastify.setErrorHandler((error, req, res) => {
		req.log.error(error.toString());
		res.send({ error });
	});
	fastify.get('/', (req, res, next) => {
		res.send({ status: 'ok' });
	});


	return fastify;
};

module.exports = createServer;
