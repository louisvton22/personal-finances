
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";

import type { AccountBalance, AccountBase } from "plaid";
export function Balances({ accounts } : { accounts: AccountBase[] }) {
    return (
        <div className="flex flex-row">
            {accounts.map((account,index) => (
                <Card key={index} className="bg-slate-100 my-10 flex-1 text-center">
                    <CardHeader>
                        <CardTitle>{account.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h1 className="font-bold">${account.balances.available ?? "0.00"}</h1>
                    </CardContent>
                </Card>
            ))
            }
        </div>
    )
}

export default Balances;