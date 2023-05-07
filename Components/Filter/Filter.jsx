import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Style from './Filter.module.css'
import images from "../../assets";
import { ChatAppContext } from '@/Context/ChatAppContext';
import { Model } from '../index';
const Filter = () => {

  const {account,addFriends} = useContext(ChatAppContext);
  //USESTATE
  const [addFriend,setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>
    <div className={Style.Filter_box}>
    <div className={Style.Filter_box_left}>
    <div className={Style.Filter_box_left_search}>
    <Image src={images.search} alt="search" width={20} height={20}/>
    <input type="text" placeholder="Search"/>
    </div>
    </div>
    <div className={Style.Filter_box_right}>
      <button>
        <Image src={images.clear} alt="clear" width={20} height={20}/>
        CLEAR CHAT
      </button>
      <button onClick={()=>setAddFriend(true)}>
        <Image src={images.user} alt="clear" width={20} height={20}/>
       ADD FRIEND
      </button>
    </div>

    {/* MODEL COMPONENT  */}
    {addFriend && (
      <div className={Style.Filter_model}>
      <Model openBox={setAddFriend} 
      title="WELCOME TO" 
       head="CHATBUDDY" 
       info="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud."
        smallInfo="Enter your name and account address to add friends"

        image ={images.hero} functionName={addFriends}/>
      </div>
    )}
    
    
    </div>
      
    </div>
  )
}

export default Filter
