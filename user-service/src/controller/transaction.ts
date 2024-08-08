import { PrismaClient } from '@prisma/client';
import response from "../util/response/response";
import passwordHelper from '../helper/password';
import { generateJWT } from '../helper/auth'
import JWT from 'jsonwebtoken'
import { checkBallance } from '../helper/payment'

const prisma = new PrismaClient()

export const sendTransaction =  async (req, res, next) => {
    try {
        let reqData = req.body
        let headers = req.headers
        let user = req.user
        let checkBal = checkBallance(user, reqData)
        let hitOnce = 0
        if (checkBal.status !== "Enough money") return response.conflict(checkBal.status, res)
        // bug on prisma update hit twice using await

        let newBalance = Number(checkBal.payment_account.amount) - reqData.amount
        prisma.paymentAccount.update({
            where: {id: reqData.payment_account_id},
            data: {
                amount: newBalance,
            },
        })

        let newPaymentHistory = {
            payment_account_id: reqData.payment_account_id,
            currency: reqData.currency,
            amount: reqData.amount
        }
        let newTransaction = {
            payment_account_id: reqData.payment_account_id,
            currency: reqData.currency,
            amount: reqData.amount,
            to_address: reqData.to_address,
            status: "SENDING",
            from_address: ""
        }
        prisma.paymentAccount.update({
            where: {id: reqData.payment_account_id},
            data: {
                amount: newBalance,
            },
        })
        prisma.paymentHistory.create({data: newPaymentHistory})
        prisma.transaction.create({data: newTransaction})
        console.log('Transaction processing started for:', reqData);
        setTimeout( async () => {
            // After 30 seconds, we assume the transaction is processed successfully
            // prisma.transaction.update({
            //     where: {id: latestQuery.id},
            //     data: {
            //         status: "SUCCESS"
            //     }
            // })
            console.log('transaction processed for:', reqData);
            return response.success('sendTransaction is success', res, {})
        }, 30000); // 30 seconds
        // return response.success('sendTransaction is success', res, {})

    } catch (error) {
        return response.error('sendTransaction is error', res, error)
    }
}


export const withdrawTransaction =  async (req, res, next) => {
    try {
        let reqData = req.body
        let headers = req.headers
        let user = req.user
        let checkBal = checkBallance(user, reqData)
        let hitOnce = 0
        if (checkBal.status !== "Enough money") return response.conflict(checkBal.status, res)
        // bug on prisma update hit twice using await

        let newBalance = Number(checkBal.payment_account.amount) - reqData.amount
        prisma.paymentAccount.update({
            where: {id: reqData.payment_account_id},
            data: {
                amount: newBalance,
            },
        })

        let newPaymentHistory = {
            payment_account_id: reqData.payment_account_id,
            currency: reqData.currency,
            amount: reqData.amount
        }
        let newTransaction = {
            payment_account_id: reqData.payment_account_id,
            currency: reqData.currency,
            amount: reqData.amount,
            to_address: reqData.to_address,
            status: "SENDING",
            from_address: ""
        }
        prisma.paymentAccount.update({
            where: {id: reqData.payment_account_id},
            data: {
                amount: newBalance,
            },
        })
        prisma.paymentHistory.create({data: newPaymentHistory})
        prisma.transaction.create({data: newTransaction})
        console.log('Withdraw Transaction processing started for:', reqData);
        setTimeout( async () => {
            // After 30 seconds, we assume the transaction is processed successfully
            // prisma.transaction.update({
            //     where: {id: latestQuery.id},
            //     data: {
            //         status: "SUCCESS"
            //     }
            // })
            console.log('withdraw transaction processed for:', reqData);
            return response.success('withdrawTransaction is success', res, {})
        }, 30000); // 30 seconds
        // return response.success('withdrawTransaction is success', res, {})

    } catch (error) {
        return response.error('withdrawTransaction is error', res, error)
    }
}
