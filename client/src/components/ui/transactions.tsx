import type { Transaction, PersonalFinanceCategory } from "plaid";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"


export function Transactions( {transactions} : { transactions: Transaction[] | undefined}) {
   
    return (
    <div className="flex flex-row">
        <Table className="w-100 ">
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]" >Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    
                </TableRow>
            </TableHeader>
            { transactions && <TableBody>
                {transactions.map((transaction) => (
                <TableRow key = {transaction.transaction_id}>
                    <TableCell className="font-medium">{transaction.date}</TableCell>
                    <TableCell>{transaction.name}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{(transaction.personal_finance_category as PersonalFinanceCategory).primary ?? "None"}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            }
            
        </Table>
        <></>
    </div>
   )
}

export default Transactions;