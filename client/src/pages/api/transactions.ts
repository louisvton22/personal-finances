import type { NextApiRequest, NextApiResponse } from "next";
import { Transaction, RemovedTransaction, TransactionsSyncRequest } from "plaid";
import client from "@/lib/plaidClient";
// New transaction updates since "cursor"
let added: Array<Transaction> = [];
let modified: Array<Transaction> = [];
// Removed transaction ids
let removed: Array<RemovedTransaction> = [];
let hasMore = true;
let cursor: string = "";
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    var data;
    const body = JSON.parse(req.body);
    while(hasMore) {
        const request: TransactionsSyncRequest = {
            access_token: body.token,
            cursor: cursor 
        }
        let transactionsRes = await client.transactionsSync(request);
        data = transactionsRes.data
        hasMore = data.has_more
        console.log("call add transactions router")

    }
    res.status(200).json(data);
}
