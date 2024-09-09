import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prismaClient";
import { execSync } from "child_process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        execSync('docker compose dbt_finances')

        const data = await prisma.monthly_spending.findMany()
        res.status(200).json(data)
    } catch(error) {
        res.status(500).json({status: "error", error: error})
    }
}
