import response from "../util/response/response";
import { sendTransaction, withdrawTransaction } from "../controller/transaction";
import { PrismaClient } from '@prisma/client';
import {checkJWT} from '../middleware/auth'

const prisma = new PrismaClient()

async function transactionRoutes (fastify) {
	fastify.post('/send', {preHandler: [checkJWT]}, sendTransaction);
	fastify.post('/withdraw', {preHandler: [checkJWT]}, withdrawTransaction);
	// fastify.post('/create', registerUser)
}

export default transactionRoutes;
