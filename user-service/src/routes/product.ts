async function productRoutes (fastify) {
	fastify.get('/:_id', async (req, res) => {
		req.log.info('get one accounts from db');
		const product = await fastify.db.products.findOne(req.params._id);
		res.send(product);
	});

	fastify.get('/', async (req, res) => {
		req.log.info('list accounts from db');
		const products = await fastify.db.products.find();
		res.send(products);
	});

	fastify.post('/', async (req, res) => {
		req.log.info('Add accounts to db');
		const products = await fastify.db.products.save(req.body);
		res.status(201).send(products);
	});

	fastify.put('/:_id', async (req, res) => {
		req.log.info('Update account to db');
		const _id = req.params._id;
		const products = await fastify.db.products.save({ _id, ...req.body });
		res.status(200).send(products);
	});

	fastify.delete('/:_id', async (req, res) => {
		req.log.info(`delete account ${req.params._id} from db`);
		const product = await fastify.db.products.findOne(req.params._id);
		await fastify.db.products.remove(product);
		res.code(200).send({});
	});
}

module.exports = productRoutes;
