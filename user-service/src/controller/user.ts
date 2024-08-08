import { PrismaClient } from '@prisma/client';
import response from "../util/response/response";
import passwordHelper from '../helper/password';
import {generateJWT} from '../helper/auth'

const prisma = new PrismaClient()

export const registerUser =  async (req, res, next) => {
    try {
        let data = req.body
        let username = data.username.toLowerCase()
        const user = await prisma.user.findMany({
            where: {
              OR: [
                {
                    email: data.email,
                },
                {
                    username: username,
                }
              ]
            },
          })
        if (user === null) {
            data.password = await passwordHelper.generatePassword(data.email, data.password)
            const newUser = await prisma.user.create({data})
            return response.success('registerUser is success', res, {})
        } else {
            return response.invalidInput('email or username has been taken, please use another email', res)
        }
    } catch (error) {
        return response.error('registerUser is error', res, error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        let data = req.body
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
          })
          
        if (user !== null) {
            let check = await passwordHelper.checkPassword(data.password, user.password, user.email)
            if (!check) return response.unauthorized(`Invalid username or password`, res)
            const jwtToken = generateJWT({username: user.username})
            const result = {
              token: jwtToken,
            }
            return response.success('loginUser is success', res, result)
        } else {
            return response.notFound('username is not registered yet, please register first', res)
        }
    } catch (error) {
        return response.error("seems password didn't match, please try again", res, error)
    }
}

export const getTransactions = async (req, res, next) => {
    try {
        let data = req.body
        
        const user = await prisma.user.findUnique({
            where: {
                username: data.username,
            },
            include: {
                PaymentAccount: {
                    include: {
                        Transaction: true
                    }
                }
            }
          })
          console.log("user: ", user);
          
          
        if (user !== null) {
            return response.success('loginUser is success', res, user)
        } else {
            return response.notFound('username is not registered yet, please register first', res)
        }
    } catch (error) {
        return response.error("Internal server error", res, error)
    }
}