import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethod";
import { useLocation } from "react-router-dom";


export default function Profile() {
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const[user,setUser] =useState({});
  const userId = useLocation().pathname.split("/")[2];
  
  useEffect(()=>{
    const fetchPost = async ()=>{
     const res = await publicRequest.get(`users/${userId}`)
     
    setUser(res.data)
    }
    fetchPost();
  },[userId])
 
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || BF +'anhbia.jpg'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture ||BF + 'noAvatar.jpg'}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userProfile={user} />
            <Rightbar profile userProfile={user} />
          </div>
        </div>
      </div>
    </>
  );
}
