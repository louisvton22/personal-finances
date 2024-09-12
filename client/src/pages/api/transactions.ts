import type { NextApiRequest, NextApiResponse } from "next";
import { Transaction, RemovedTransaction, TransactionsSyncRequest, AccountBase } from "plaid";
import client from "@/lib/plaidClient";
// New transaction updates since "cursor"
let added: Array<Transaction> = [];
let modified: Array<Transaction> = [];
// Removed transaction ids
let removed: Array<RemovedTransaction> = [];
let accounts: Map<string, AccountBase> = new Map<string, AccountBase>();
let hasMore = true;
let cursor: string = "";
export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    var data = null;
    const body = JSON.parse(req.body);
    while(hasMore) {
        const request: TransactionsSyncRequest = {
            access_token: body.token,
            cursor: cursor 
        }
        let transactionsRes = await client.transactionsSync(request);
        data = transactionsRes.data;

        console.log(data.has_more);
        hasMore = data.has_more;
        cursor = data.next_cursor;
        console.log("call add transactions router")
        added = added.concat(data.added)
        for (let account of data.accounts) {
            if (!accounts.has(account.account_id)) {
                accounts.set(account.account_id, account);
            }
        }
        console.log(` accounts seen: ${Array.from(accounts).join(' ')}`);
    }
    console.log(added);
    res.status(200).json({
        accounts: Array.from(accounts.values()),
        added:added});
}
