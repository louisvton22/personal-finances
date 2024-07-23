import { Configuration, PlaidEnvironments, PlaidApi} from 'plaid';
const configuation = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': "6675ece711b2a6001c20f88b",
            'PLAID-SECRET': "1cbcab7f8e202f8cbb73eb2f963eca"
        }
    }
})

const client = new PlaidApi(configuation)


export default client;