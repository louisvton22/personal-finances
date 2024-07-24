import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from 'pg';


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    try {
        console.log("establishing connections")
        console.log(process.env.PGUSER)
        const client = new Client();
        await client.connect()
        console.log("connected to database")
    } catch(error) {
        console.error(error)
    }
}