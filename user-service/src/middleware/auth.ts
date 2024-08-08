const JWT = require('jsonwebtoken');
const response = require('../util/response/response');
const errorCode = require('./../util/flag/errorCode');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const checkJWT = async (req, res, next) => {
    let authorization = req.headers.authorization
    const checkToken = authorization;
    if (!checkToken) return response.invalidInput('No token provided', res, errorCode.jwt_token_empty);
    const tokenHeader = authorization.split(' ');
    const tokenType = tokenHeader[0];
    const token = tokenHeader[1];
    if (tokenHeader.length > 2 || tokenType !== 'Bearer' || !token) return response.unauthorized('Unauthorized access. Please contact our technical support.', res, errorCode.jwt_token_empty);
    try {
        const decoded = JWT.verify(token, process.env.JWT_PRIVATE_KEY);
        // console.log("decoded: ", decoded);
        
        const user = await prisma.user.findUnique({
            where: {
                username: decoded.username,
            },
            include: {
                PaymentAccount: true
            }
        })
        if (!user) return response.invalidInput('No User Found from this token id', res, errorCode.jwt_token_notmatch);
        req.user = user;
    }
    catch (error) {
        let dataError = {
            success: false,
            flag: 400,
            message: "Invalid token",
        }
        res.status(400).send(dataError)
    }
    next();
};

