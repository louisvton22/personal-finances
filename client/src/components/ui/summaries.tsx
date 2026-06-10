import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type Summary = { month_name: string; sum: number };

export function Summaries({ summaries }: { summaries: Summary[] | undefined }) {
    return (
        <div className="flex flex-row">
            <Table className="w-100">
                <TableHeader>
                    <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                {summaries && <TableBody>
                    {summaries.map((summary) => (
                        <TableRow key={summary.month_name}>
                            <TableCell>{summary.month_name}</TableCell>
                            <TableCell className="text-right">{summary.sum}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>}
            </Table>
            <></>
        </div>
    )
}

export default Summaries;
