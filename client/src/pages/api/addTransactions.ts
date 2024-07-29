import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "plaid";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    console.log("adding transactions")
    console.log(req.body);
    const transactions: Transaction[] = JSON.parse(req.body);
    try {
    await prisma.transaction.createMany({
            data: transactions.map( transaction => {
                return {
                id: transaction.transaction_id,
                account: {
                    connect: { id: transaction.account_id }
                },
                amount: transaction.amount,
                authorizedDate: transaction.authorized_date,
                logoUrl: transaction.logo_url,
                merchantName: transaction.merchant_name,
                category: transaction.personal_finance_category?.primary,
                currency: transaction.iso_currency_code
                }
            })
            }
        );
    res.status(200).send("success")
} catch(error) {
    res.status(500).json({status: "error", error: error})
}
}