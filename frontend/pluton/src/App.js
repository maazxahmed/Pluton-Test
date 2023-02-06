import logo from './logo.svg';
import './App.css';
import abi from "./tokenabi.json";
import { useEffect, useState } from "react";
import Web3 from 'web3';



function App() {

  // const web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/ccd344042de14243832b7833b436be2d"));
  const web3 = new Web3(window.ethereum);
  const [accounts, setAccounts] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [input, setInput] = useState("");
  const [sendto, setSendto] = useState("");
  const contractAddress = "0x9d6228BB59CAc871cDBF745B901417C712090F86"
  const contract = new web3.eth.Contract(abi, contractAddress);

  
  // contract.methods.balanceOf(accounts).call().then(console.log)
function inputHandler(e){
setInput(e.target.value)
}

function sendToHandler(e){
  setSendto(e.target.value)
}




const transfer = async () => {

  const value = web3.utils.toWei(input)
  console.log(value)
 contract.methods.transfer(sendto,value).send({from : accounts})

}
const checkBalance = async () =>{
  console.log(accounts)
 contract.methods.balanceOf(accounts).call().then(setAmount)
 console.log(amount)
 setBalance(Web3.utils.fromWei(amount))


}
 
 const connectWallet = async () => {
  let provider = window.ethereum
  provider.request({method: 'eth_requestAccounts'}).then(accounts=>{
    console.log(accounts);
    setAccounts(accounts[0])
  }).catch(error=>{
    console.log(error)
  })

 }
  

  return (
    <div className="App">
      <h2> Welcome! </h2>

      <button onClick={connectWallet}> Connect Wallet</button>
      <button onClick={checkBalance}> Check Balance</button>

      <h2>{accounts}</h2>
      <h3> your amount is {balance}</h3>

      <h3> Transfer :</h3>
      <h4>To:</h4>
      <input onInput={sendToHandler}></input>
      <h4>Value: </h4>
      <input onInput={inputHandler}></input>
      <button onClick={transfer}>Transfer</button>
     
    </div>
  );
}

export default App;
