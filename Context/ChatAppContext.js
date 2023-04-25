import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { CheckIfWalletIsConnected,ConnectWallet,connectingWithContract } from '@/Utils/apiFeature'

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) =>{

    //usestate

    const [account,setAccount] = useState("");
    const [userName,setUserName] = useState("");
    const[friendList ,setFriendLists] = useState([]);
    const[friendMsg,setFriendMsg] = useState([]);
    const[loading,setLoading] = useState(false);
    const[userLists,setUserLists] = useState([]);
    const[error,setError] = useState("");


    //CHAT USER DATA
    const[currentUserName,setCurrentUserName] = useState("");
    const[currentUserAddress,setCurrentUserAddress] = useState("");

    const router = useRouter();


    //FETCH DATA AT THE TIME OF PAGE LOAD

    const fetchData = async()=>{
        try{

            //GET CONTRACT
            const contract = await connectingWithContract();
            //GET ACCOUNT
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            //SET USER NAME
            const userName = await contract.getUserName(connectAccount);
            setUserName(userName);
            //GET FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
            //GET ALL APP USER
            const userList = await contract.getAllAppUser();
            setUserLists(userList);



        }catch(err){
            setError("Please Install and Connect Your Wallet");
        }
    };
    useEffect(()=>{
        fetchData();
    },[]);

    //READ MESSAGE
    const readMessage = async (friendAddress)=>{
        try{
            // setLoading(true);
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(msg);
            // setLoading(false);
        }catch(err){
            setError("Currently you have no message")
        }
    }

    //CREATE ACCOUNT
    const createAccount = async ({name,accountAddress})=>{
        try{
            // if(name || accountAddress) return setError("Please Fill All the Field");
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
            
           
        }catch(err){
            setError("Error While creating your account please reload the browser");
        }
    }


   //ADD YOUR FRIEND
   const addFriends = async ({name,accountAddress})=>{
    try{
        // if(name || accountAddress) return setError("Please Fill All the Field");

        const contract = await connectingWithContract();
        const addMyFriend = await contract.addFriend(accountAddress,name);
        setLoading(true);
        await addMyFriend.wait();
        setLoading(false);
        router.push("/");
        window.location.reload();
    }
    catch(err){
        setError("Something went wrong while adding friends please try again");
    }
   }


   //send message to friend
    const sendMessage = async ({msg,address})=>{
        try{
            if(msg || address) return setError("Please Type Your Message");
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        }catch(err){
            setError("Something went wrong while sending message please try again");
        }
    }

    //READ INFO
    const readUser = async (userAddress)=>{
        const contract = await connectingWithContract();
        const userNames = await contract.getUserName(userAddress);
        setCurrentUserName(userNames);
        setCurrentUserAddress(userAddress);


    }


    return(




        <ChatAppContext.Provider value={{readMessage,createAccount,addFriends,sendMessage,readUser
        ,account,userName,friendList,
        friendMsg,loading,userLists,error,
        currentUserName,currentUserAddress,ConnectWallet,CheckIfWalletIsConnected
        }}>
            {children}
        </ChatAppContext.Provider>
    )
}