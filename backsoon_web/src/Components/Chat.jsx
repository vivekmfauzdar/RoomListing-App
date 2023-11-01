import React, { useEffect, useState } from 'react'
import chat from '../Icons/conversation.png'
import image from '../Images/box7_image.jpg'
import { dataref } from '../firebase';
import { getAuth } from 'firebase/auth';
import useric from '../Icons/user (6).png'
import {v4} from 'uuid'
import { toast, Toaster } from "react-hot-toast";
import { dbref } from '../firebase';
import { getDatabase, ref, set, onValue, push } from "firebase/database";

import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,setDoc,doc, serverTimestamp, getDoc, where, getDocs
} from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import IndividualChat from './IndividualChat';
import { Hidden } from '@mui/material';

function Chat() {

    const [user, setUsers] = useState([]);
    const [curUser, setCurUser] = useState('')
    const [chatMsg, setChatMsg] = useState('');
    const [allMessages, setAllMsg] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const [chatSpecific, setChatSpecific] = useState(null);
    const [receiverData, setReceiverData] = useState(null)
    const [moreData, setMoreData] = useState([])
    const [forBoth, setForBoth] = useState(null)
    const location = useLocation()

     // getting the current user
     useEffect(()=> {
       const auth = getAuth()
       let curUser = auth.onAuthStateChanged((user)=> {
   
      if(user){
         setCurUser(user)
      }
      else{
        setCurUser(null)
      }
    })
    }, [curUser])

    //Nullify receiever data once chat specific get selected...
    useEffect(() => {

      setReceiverData(null)
    }, [chatSpecific])


    // This is coming from more details
    useEffect(()=> {

      setReceiverData(location.state)
      
    },[location])


    // this is for both
    useEffect(() => {

      if(receiverData!==null){
      setForBoth(receiverData)
      // console.log(receiverData)

      }else if(chatSpecific!==null){

        setForBoth(chatSpecific)
        console.log('chatSpecific is here brother', chatSpecific)
      }

    }, [receiverData, chatSpecific])
    
    const senderroom = curUser.uid + forBoth?.uid;
    const receiverroom = forBoth?.uid + curUser.uid;

    // Retrieving the Message from Firebase
     useEffect(() => {

      const GetData  = () => {

        if(forBoth){
        const hj = onSnapshot(query(collection(dataref, "BacksoonWebChat", senderroom, "messages"), orderBy('timestamp')), (snapshot)=> {
          setAllMsg(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                cur: doc.data(),
            })))
        });
      }
     }

       GetData();       
     }, [forBoth])

     console.log("for both is: ", forBoth)

     // Getting the Recent Users from firebase
     useEffect(() => {

      const RecentUsers = async() => {

        const starCountRef = ref(dbref, 'RecentChatWeb/' + curUser.uid);
        onValue (starCountRef, (snapshot) => {
        
        //array for storing the keys
        const recentUserIds = [];

        //Getting the keys and   
        snapshot.forEach((doci) => {
        const recentkey = doci.key;
        const msg = doci.child("message")
        recentUserIds.push(recentkey);
         
          const recentUserDocs = [];
        
          for(const userIds of recentUserIds){
            const q = query(collection(dataref, "Users"), where("uid", "==", userIds));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
      
              querySnapshot.forEach((doc) => {
                recentUserDocs.push({ 
                  id: doc.id,
                  msg: msg.val(),
                  recentUser: doc.data(),
                });
                setRecentUsers(recentUserDocs)         
                // setRecentUsers((prev) => [...prev, recentUserDocs])         
                // setRecentUsers((prev) => ({...prev, recentUserDocs}))         

              });
            })}             
        });
        
    }); 
 
      }
      RecentUsers()
     },[curUser])     

     console.log("this is chat message", recentUsers)
   
    //sending the msg
    const sendMsg = async ()=> {


       try{
        if(curUser && receiverData){

         
          if(chatMsg === ''){

            toast.success("Type some message")
            return
          }

          await addDoc(
            collection(
                dataref,
                "BacksoonWebChat",
                senderroom,
                "messages"
            ),
            {
                username: "user.displayName",
                senderUid: curUser.uid,
                receiverUid: receiverData.uid,
                message: chatMsg,
                timestamp: new Date(),
                currenttime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
        );
         
        await addDoc(
            collection(
                dataref,
                "BacksoonWebChat",
                receiverroom,
                "messages"
            ),
            {
                username: "user.displayName",
                senderUID: curUser.uid,
                receiverUID: receiverData.uid,
                message: chatMsg,
                timestamp: new Date(),
                currenttime: new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
        );

        // CODE TO ACCESS THE RECENT USERS
        set(ref(dbref, "RecentChatWeb/" + curUser.uid +  "/" + receiverData.uid), {

          currenttime : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
          message: chatMsg,
          uid : receiverData.uid

        })
       
        set(ref(dbref, "RecentChatWeb/" + receiverData.uid + "/" + curUser.uid ), {

          currenttime : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
          message: chatMsg,
          uid : receiverData.uid

        })

        }
      } catch (error) {
      console.error(error);
  }
  setChatMsg("")
}

    return (
    <div className='max-w-full h-[90vh]'>

    <Toaster  toastOptions={{duration:2000}}/>

     <div> 

     {recentUsers.length !== 0 ?
        <div className='grid grid-cols-3'>
        <div className='overflow-scroll	h-[90vh]'> 
        <h1 className='text-2xl font-semibold mb-5 ml-2 pl-5 mt-5'>Chats</h1>
        
        {recentUsers && recentUsers.map(({id,msg,recentUser}) => {

return(
<div key={id} onClick={() => {
 setChatSpecific(recentUser)}}>
<div className='lg:max-w-[400px] max-w-[600px] flex gap-2 ml-2 p-2 cursor-pointer'>
{recentUser?.profileImage === 'NO Image' ? <img src={useric} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" /> : <img src={recentUser?.profileImage} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" /> } 
 <div> 
   { <h2 className='text-lg font-semibold'>{recentUser?.name}</h2> }
   <p className='text-gray-600'>{msg}</p>                     
  </div>
 <p>wednesday</p>
</div>
<hr />
</div>
)
})}

      </div>
            <div className="flex col-span-2 h-[90vh] flex-col bg-blue-50	">

              <div className="bg-white flex items-center gap-3 py-4">
               {(forBoth?.profileImage === 'NO Image' ? <img src={useric} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" /> : <img src={forBoth?.profileImage} className='h-[46px] w-[46px] rounded-full max-w-full' alt="" />) } 
               <h1 class="text-center text-2xl font-bold text-black">{forBoth?.name}</h1>
              </div>  
            
           <div className="flex-grow overflow-y-auto">
           <div style={messagesDiv}>
            {/* <!-- Individual chat message --> */}
            {allMessages && allMessages.map(({id, cur}) => {
 
               return (
                <div key={id} style={{margin: 2, display: 'flex', flexDirection: curUser?.uid === cur.senderUid ? "row-reverse" : "row"}} >

                <span
                         style={{
                                            backgroundColor: "#363062",
                                            color: '#FFFFFF',
                                            padding: 6,
                                            borderTopLeftRadius:
                                                curUser?.uid == cur.senderUid ? 10 : 0,
                                            borderTopRightRadius:
                                                curUser?.uid == cur.senderUid ? 0 : 10,
                                            borderBottomLeftRadius: 10,
                                            borderBottomRightRadius: 10,
                                            maxWidth: 400,
                                            fontSize: 15,
                                            textAlign:
                                                curUser?.uid == cur.senderUid ? "right" : "left",
                                        }}
                                    >
                                        {cur.message}
                                    </span>
                </div>

               )

            })}
        
          </div>
         </div>
           <div class="flex items-center p-4">
         <input type="text" value={chatMsg} onChange={(e) => setChatMsg(e.target.value)} placeholder="Type your message..." class="w-full rounded-lg border border-gray-300 px-4 py-2" />
        <button class="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white" onClick={sendMsg}>Send</button>
       </div>
      </div>
        </div>
      : <div className='h-[90vh] min-w-[400px] grid grid-cols-1 items-center justify-items-center'>
       <div className='grid grid-cols-1 items-center justify-items-center'>
            <img src={chat} className='w-[100px]' alt="" />
            <h1 className='text-xl font-semibold'>No Chats Available</h1>
            <p className='text-[14px]'>Your conversations with users show here</p>
        </div>
     </div>}
     </div>
     {/* Chat Design Ends*/}
  
    </div>
  )
}

export default Chat

const messagesDiv = {
  padding: 5,
  display: "flex",
  flexDirection: "column",
  flex: 1,
  maxHeight: 460,
  overflowY: "scroll",
};