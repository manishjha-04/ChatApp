import Image from 'next/image'
import React, { useContext, useState } from 'react'

import Style from './Model.module.css'
import { ChatAppContext } from '@/Context/ChatAppContext'
import images from "../../assets";
import { Loader } from '../../Components/index';


const Model = ({openModal,title,head,info,smallInfo,images,functionName,}) => {

  //USESTATE
  const[name,setName] = useState("");
  const [accountAddress,setAccountAddress] = useState("");
  const {loading} = useContext(ChatAppContext);




  return (
    <div className={Style.Model}>
    <div className={Style.Model_box}>
      <div className={Style.Model_box_left}>

      </div>
    </div>
      
    </div>
  )
}

export default Model
