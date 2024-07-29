import prisma from "@/lib/prismaClient";

import type { NextApiRequest, NextApiResponse } from "next";
import type { AccountBase, AccountBalance } from "plaid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const accounts: AccountBase[] = JSON.parse(req.body)

    await prisma.account.createMany({
        data: accounts.map( account => {
           return {
                id: account.account_id,
                available: account.balances.available,
                current: account.balances.current,
                name: account.name,
                subtype: account.subtype
            }
        })   
    })

    res.status(200).send({status: "successfully added accounts"})
    
    } catch (error) {
        res.status(500).send({status: "error", error: error})
    }
}