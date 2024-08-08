import response from "../util/response/response";
import { registerUser, loginUser , getTransactions} from "../controller/user";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function userRoutes (fastify) {
	fastify.post('/', loginUser);
	fastify.post('/create', registerUser)
	fastify.post('/data', getTransactions)
}

export default userRoutes;
