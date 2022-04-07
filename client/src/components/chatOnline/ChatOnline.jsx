import axios from "axios";
import { useEffect, useState } from "react";
import {  userRequest } from "../../requestMethod";
import "./chatOnline.css";

export default function ChatOnline({onlinesUser,currentId,setCurrentChat}) {
  const [friends,setFriends] = useState([]);
  const [friendsOnlines,setFriendsOnlines] = useState([]);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
   useEffect(()=>{
     const getFriend = async ()=>{
       const res = await userRequest.get(`users/friends/${currentId}`);
        setFriends(res.data)
     }
     getFriend();
   },[currentId])
   useEffect(()=>{
    setFriendsOnlines(friends.filter((f) => onlinesUser.includes(f._id)));
  },[friends,onlinesUser])
  const handleClick = async (user) => {
    try {
      const res = await userRequest.get(
        `conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="chatOnline" >
    {
      friendsOnlines.map(f =>{
        return    <div className="chatOnlineFriend" onClick={()=> handleClick(f)}  >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                    f.profilePicture || BF+"noAvatar.jpg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{f.username}</span>
        </div>


        })
      }
        </div>
        </>
  );
}