import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import type { Transaction } from "plaid";
import type { PrismaClientValidationError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    console.log("adding transactions")
    const transactions: Transaction[] = JSON.parse(req.body);
    try {
    await prisma.transaction.createMany({
            data: transactions.map( transaction => {
                return {
                id: transaction.transaction_id,
                account_id: transaction.account_id,
                amount: transaction.amount,
                authorizedDate: transaction.authorized_date ?? "NA",
                logoUrl: transaction.logo_url ?? "NA",
                merchantName: transaction.merchant_name ?? "NA",
                category: transaction.personal_finance_category?.primary ?? "NA",
                currency: transaction.iso_currency_code ?? "NA"
                }
            })
            }
        );
    res.status(200).send("success")
} catch(error) {
    res.status(500).json({status: "error", error: (error as PrismaClientValidationError).message})
}
}