import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "plaid";
import type { PrismaClientValidationError } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    console.log("adding transactions")
    const transactions: Transaction[] = JSON.parse(req.body);
    try {
    const data =  transactions.map( transaction => {
        return {
        id: transaction.transaction_id,
        account_id: transaction.account_id,
        amount: transaction.amount,
        authorized_date: transaction.authorized_date ? new Date(transaction.authorized_date) : null,
        logoUrl: transaction.logo_url ?? "NA",
        merchant_name: transaction.merchant_name ?? "NA",
        category: transaction.personal_finance_category?.primary ?? "NA",
        currency: transaction.iso_currency_code ?? "NA"
        }
    })
    await prisma.transaction.createMany({
            data: data
            }
        );
    res.status(200).send("success")
} catch(error) {
    res.status(500).json({status: "error", error: (error as PrismaClientValidationError).message})
}
}