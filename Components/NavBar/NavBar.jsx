import { useContext, useEffect, useState } from 'react'
import React  from 'react'
import Image from 'next/image'
import Link from 'next/link'


//Internal Import
import { ChatAppContext } from '@/Context/ChatAppContext'
import Style from './NavBar.module.css'
import { Model,Error } from '../index'
import images from "../../assets";

const NavBar = () => {

  const menuItems =[
    {
      menu:"All Users",
      link: "alluser"
    },
    {
      menu:"CHAT",
      link: "/"
    },
    {
      menu:"CONTACT",
      link: "/"
    },
    {
      menu:"SETTING",
      link: "/"
    },
    {
      menu:"FAQS",
      link: "/"
    },
    {
      menu:"TERMS OF USE",
      link: "/"
    },
  ];

  //USESTATE

  const[active,setActive] = useState(2);
  const [open,setOpen] = useState(false);
  const [openModal,setOpenModal] = useState(false);

  const{account,userName,connectWallet,createAccount,error} = useContext(ChatAppContext);







  return (
    <div  className={Style.NavBar}>
    <div className={Style.NavBar_box}>
      <div>
        <Image src={images.logo} alt="logo" width={50} height={50}/>
      </div>
      <div className={Style.NavBar_box_right}>
      {/* //DEKSTOP */}
        <div className={Style.NavBar_box_right_menu}>
        {menuItems.map((el,i)=>(
          <div onClick={()=>setActive(i+1)}key={i+1} className={`${Style.NavBar_box_right_menu_items} ${active== i+1? Style.active_btn:"" }`}>

            <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>
              {el.menu}
            </Link>
          </div>
        ))}

        </div>

        {/* MOBILE  */}
        {
         open && (  
             <div className={Style.mobile_menu}>
        {menuItems.map((el,i)=>(
          <div onClick={()=>setActive(i+1)}key={i+1} className={`${Style.mobile_menu_items} ${active== i+1? Style.active_btn:"" }`}>

            <Link className={Style.mobile_menu_items_link} href={el.link}>
              {el.menu}
            </Link>
          </div>
        ))}
<p className={Style.mobile_menu_btn}>
  <Image src ={images.close} alt="close" width={50} height={50} onClick={()=>setOpen(false)}/>
</p>
        </div>)
        }

          {/* CONNECT WALLET  */}
          <div className={Style.NavBar_box_right_connect}>
          {
            account == " " ?( <button onClick={()=>connectWallet()}> {""}<span>Connect Wallet</span></button> ): 
            (<button onClick={()=>setOpenModal(true)}> {""}
            <Image src={userName ? images.accountName : images.create2} alt="Account image" width={20} height={20} />{""}<small>{userName || "Create Account"}</small>
            </button>)
          }

          </div>

          <div className={Style.NavBar_box_right_open} onClick={()=> setOpen(true)}>
          <Image src={images.open} alt="open" width={30} height={30}/>

          </div>



      </div>
    </div>

    {/* MODAL COMPONENT  */}

    {openModal && (
      <div className={Style.modelBox}>
      <Model openBox= {setOpenModal} 
        title = "WELCOME TO"
        head = "CHAT BUDDY"
        info='lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        smallInfo = "Please Enter Your Name"
        image = {images.hero}   
        functionName = {createAccount}
        address={account}

      />

      </div>
    )}
    {error==""? "": <Error error={error}/>}
      
    </div>
  )
}

export default NavBar
