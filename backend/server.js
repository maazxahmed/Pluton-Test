//imports
require('dotenv').config()
const abi = require('./tokenabi.json')
const express = require('express');
const Accounts = require("./models/accountModel")
const Web3 = require('web3');
const mongoose = require('mongoose')

//initialization
const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB_SOCKET));
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);

//Calling transfer function of Contract
async function transfer(to, value){

    const tx = {
        'from': process.env.FIRST_ACCOUNT_PUBKEY,
      'to': process.env.CONTRACT_ADDRESS,
       'gas': 500000,
      'maxPriorityFeePerGas': 1999999987,
      'data': contract.methods.transfer(to, value).encodeABI()
    }
    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.FIRST_ACCOUNT_PRIVKEY);
    //const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Transfer Successful")
    console.log(transactionReceipt)

}
//Minting new tokens
async function mint(address , value) {
 
    //the transaction
    const tx = {
      'from': process.env.FIRST_ACCOUNT_PUBKEY,
      'to': contractAddress,
       'gas': 500000,
      'maxPriorityFeePerGas': 1999999987,
      'data': contract.methods.mint(address, value).encodeABI()
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, process.env.FIRST_ACCOUNT_PRIVKEY);
   // const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Minted Successfully")
}

//Checking amount of tokens one has in his account.
function checkBalance(account){
    contract.methods.balanceOf(firstAccount).call().then(console.log)
}

//logging transfer events

function transferEvent(){
    console.log(contract.events.Transfer())
}

transferEvent();
return


//connecting to Database
mongoose
.connect(process.env.MONGOOSE_URI)
.then(()=>{
    console.log("Connected to Database")
}).catch((error)=>{
    console.log(error)
})


app.use(express.json())
app.get('/', (req, res) => {
  res.send('Homepage!');
});
//Port Assignment
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});


//Get All Accounts and Balances 

app.get('/accounts', async(req,res)=>{
    try{
const account = await Accounts.find({})
res.status(200).json(account)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Account and Balance by address
app.get('/accounts/:address',async(req,res)=>{
    try{
       
        const account = await Accounts.findOne({"address" : req.params.address})
        res.status(200).json(account)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add account in database
app.post('/accounts', async(req,res)=>{
   try{

    const account = await Accounts.create(req.body)
    res.status(200).json(account)

   }catch(error){
        console.log(error.message)
        res.status(500).json({message : error.message})
   }
})

app.put('/accounts/:address',async(req,res)=>{
    try{
       
        const account = await Accounts.findOneAndUpdate({"address" : req.params.address},req.body)

        const updatedAccount = await Accounts.findOne({"address" : req.params.address})
        res.status(200).json(updatedAccount)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/accounts/:address',async(req,res)=>{
    try{
       
        const account = await Accounts.findOneAndDelete({"address" : req.params.address})
        res.status(200).json(account)

    }catch(error){
        res.status(500).json({message: error.message})
    }
})