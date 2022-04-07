import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethod";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";


export default function Feed({userProfile,setHiddenModal}) {
  const[posts,setPosts] =useState([]);
  const user = useSelector(state => state.user.currentUser)
  useEffect(()=>{
    const fetchPost = async ()=>{
      const res = userProfile?  await publicRequest.get(`posts/profile/${userProfile._id}`)
    : await publicRequest.get(`posts/timeline/${user._id}`);
    setPosts(res.data.sort((p1,p2)=> {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    }))
    }
    fetchPost();
  },[userProfile,user._id])
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {
          userProfile ? userProfile._id === user._id && <Share  /> : <Share  />
        }
       
        {posts.map((p) => (
          <Post setHiddenModal={setHiddenModal} key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
