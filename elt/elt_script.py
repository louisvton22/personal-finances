import plaid
from plaid.api import plaid_api
import plaid.api_client
import plaid.configuration
import plaid.model
import plaid.model.country_code
import plaid.model.item_public_token_create_request
import plaid.model.link_token_create_request_user
import plaid.model.products
import plaid.model.transaction
import plaid.model.transactions_sync_request
API_URL = "https://sandbox.plaid.com"

configuration = plaid.configuration.Configuration(
    host=plaid.configuration.Environment.Sandbox,
    api_key={
        'clientId':"6675ece711b2a6001c20f88b",
        'secret':"1cbcab7f8e202f8cbb73eb2f963eca"
    }
)

# Create Plaid Client
api_client = plaid_api.ApiClient(configuration)
client = plaid_api.PlaidApi(api_client)

# Create Request for Public Token
pt_request = plaid_api.LinkTokenCreateRequest(
    products=[plaid.model.products.Products("transactions")],
    client_name="Personal Finances",
    country_codes=[plaid.model.country_code.CountryCode('US')],
    language="en",
    user=plaid.model.link_token_create_request_user.LinkTokenCreateRequestUser(
        client_user_id='custom_john',
        phone_number='+1 415 5550123'
    )

)
pt_res = client.link_token_create(pt_request)
print(pt_res)
public_token = pt_res['link_token']

# Create Request to exchange public token for access token and item id 
ex_req = plaid_api.(public_token=public_token)

ex_res = client.item_public_token_exchange(ex_req)

print(ex_res)

# Get transactions 



cursor = "now"
added = []
modified = []

removed = []
has_more = True
while has_more:
    request = plaid_api.TransactionsSyncRequest(
        access_token=ex_res["access_token"],
        cursor = cursor
    )

    response = client.transactions_sync(request)
    # Add this page of results
    added.extend(response['added'])
    modified.extend(response['modified'])
    removed.extend(response['removed'])
    has_more = response['has_more']
    # Update cursor to the next cursor
    print(response)
    cursor = response['next_cursor']
print(added,removed,modified)



