import type { NextApiRequest, NextApiResponse } from "next";
import { SandboxPublicTokenCreateRequest, ItemPublicTokenExchangeRequest, Configuration, PlaidEnvironments, PlaidApi, Products, ItemPublicTokenExchangeResponse} from 'plaid';
import client from "@/lib/plaidClient";
type Data =  {
    access_token: string,
    // item_id: string,
    // request_id: string,
    // status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    // const configs = {
    //     user: {
    //       // This should correspond to a unique id for the current user.
    //       client_user_id: 'louis-ton',
    //     },
    //     client_name: 'Plaid Quickstart',
    //     products: [Products.Transactions],
    //     country_codes: [CountryCode.Us],
    //     language: 'en',
    //   }; 
    let tokenRequest: SandboxPublicTokenCreateRequest = {
        institution_id: "ins_109512",
        initial_products: [Products.Transactions],
        // options: {
        //     override_username: "custom_john",
        //     override_password: "password"
        // }
    }
    try {
        const publicTokenResponse = await client.sandboxPublicTokenCreate(tokenRequest)
        const publicToken = publicTokenResponse.data.public_token
        
        const exchangeRequest: ItemPublicTokenExchangeRequest = {
            public_token: publicToken
        }

        const exchangeResponse = await client.itemPublicTokenExchange(exchangeRequest)
        
       
        res.status(200).json({access_token: exchangeResponse.data.access_token})
    } catch(error) {
        console.error(error);
        res.status(500).json({access_token: "null"})
    }
}
