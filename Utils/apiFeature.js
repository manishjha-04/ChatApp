import {ethers} from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress,ChatAppABI } from "@/Context/constants";

export const  CheckIfWalletIsConnected = async () => {

    try{
        if(!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        const firstAccount = accounts[0];
        return firstAccount;
    }
    catch(err){
            console.log(err);
        }
}

export const connectWallet = async () => {

    try{
        if(!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const firstAccount = accounts[0];
        return firstAccount;

    }catch(err){
        console.log(err);
    }

}

const fetchContract = (signerOrProvider) => {
    return new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);
}

export const connectingWithContract = async()=>{
    try{
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    }catch(err){
        console.log(err);
    }
}

export const convertTime = (time)=>{
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + ":" + newTime.getMinutes() + ":" + newTime.getSeconds() + " " + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

    return realTime;

}