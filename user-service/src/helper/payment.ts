import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient()

export const checkBallance = (user, requestData) => {
    try {
        let status = "No payment account registered"
        type PaymentAccount = {
            id: number;
            type: String ;
            currency: String;
            amount: Prisma.Decimal;
            userId: number
        }
        let payment_account: PaymentAccount
        let data = {
            payment_account: payment_account,
            status: status,
            balance: 0
        }
        user.PaymentAccount.map((item, i) => {
            if (item.id === requestData.payment_account_id) {
                if (item.amount > requestData.amount) {
                    data.payment_account = item
                    data.balance = item.amount
                    data.status = "Enough money"
                } else {
                    data.status = "Insufficient money"
                }
            }
        })
        return data
    } catch (error) {
        console.log("tryCatch checkBallance error: ", error);
        throw error
    }
}