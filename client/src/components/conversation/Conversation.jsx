import axios from "axios";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import "./conversation.css";

export default function Conversation({conversation,currentUser}) {
  const[user,setUser]= useState(null);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const friendId = conversation.members.find( m => m !== currentUser._id);
    const getFriend = async()=>{
         const res = await userRequest.get(`users/${friendId}`);
         setUser(res.data)
    }
    getFriend();
  },[])
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={user?.coverPicture || BF +'noAvatar.jpg'}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}