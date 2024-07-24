import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button"
import { InputForm } from "@/components/ui/customForm";
import  React  from 'react'
import { access } from "fs";
import Balances from "@/components/ui/balances";
import Transactions from "@/components/ui/transactions";
import { Transaction } from "plaid";


const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [accessToken, setAccessToken] = React.useState("");
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [accounts, setAccounts] = React.useState([]);
  async function getAccessToken() {
    let accessToken: string | null
    if (!localStorage.getItem("accessToken")) {
      console.log("getting link token")
      let data: Response  = await fetch("./api/getLinkToken")
      accessToken = (await data.json()).access_token
  
      localStorage.setItem("accessToken", accessToken!)
      setAccessToken(accessToken!);
      console.log("stored access token")
    } else {
      accessToken = localStorage.getItem("accessToken")
      setAccessToken(accessToken!);
      console.log("access token already created")
    }
  }
  
  async function getTransactions() {
    let data = await fetch("./api/transactions", {
      method: "POST",
      body: JSON.stringify({token: accessToken})
    })
    let transactions = await data.json();
    console.log(transactions);
    setTransactions(transactions.added);
    setAccounts(transactions.accounts);
  }

  async function addTransactions() {
    let data = await fetch("./api/addTransactions")
    console.log(data)
  }

  return (
    <main>
      <Button onClick={getAccessToken}>Get Access Token</Button>
      <Button onClick={getTransactions}>Get Transactions</Button>
      <Button onClick={addTransactions}>Add Transactions</Button>
      <Balances accounts={accounts}></Balances>
      <Transactions transactions={transactions}></Transactions>
      <InputForm></InputForm>
    </main>
  );
}


