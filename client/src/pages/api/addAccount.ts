import prisma from "@/lib/prismaClient";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

import type { NextApiRequest, NextApiResponse } from "next";
import type { AccountBase, AccountBalance, AccountSubtype } from "plaid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const accounts: AccountBase[] = JSON.parse(req.body)
    let data = accounts.map( account => {
        return { id: account.account_id, available: account.balances.available ?? 0, current: account.balances.current, name: account.name, subtype: (account.subtype as string) }
    })
    console.log("adding account data")
    console.log(data);
    await prisma.account.createMany({
        data: data  
    })

    res.status(200).send({status: "successfully added accounts"})

    } catch (error) {
        res.status(500).send({status: "error", error: (error as PrismaClientValidationError).message})
    }
}