import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import { useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";
import {Link} from 'react-router-dom'
export default function Rightbar({ userProfile }) {
 
  const currentUser = useSelector(state => state.user.currentUser)
  const[friends,setFriends]=useState([]);
  const[users,setUsers]=useState([]);
  const[followings,setFollowings] = useState([])
  const [followed, setFollowed] = useState(null);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const getFollowings = async ()=>{
      const res = await userRequest(`users/followings/${currentUser._id}`);
      setFollowings(res.data)
    }
    getFollowings();
  },[])
  
  useEffect( ()=>{
    setFollowed(followings.includes(userProfile?._id) ? true : false)
 },[])
   useEffect( ()=>{
     setFollowed(followings.includes(userProfile?._id) ? true : false)
  },[userProfile,followings])
  useEffect( ()=>{
    const getfrineds = async ()=>{
       const res =  await userRequest.get(`users/friends/${userProfile._id}`);
       setFriends(res.data);  
   }
   userProfile && getfrineds();
  },[userProfile])
  useEffect( ()=>{
    const getfrineds = async ()=>{
       const res =  await userRequest.get(`users/friends/${currentUser._id}`);
       setUsers(res.data);  
   }
  getfrineds();
  },[])
  // console.log(currentUser.followings);
  // console.log( currentUser.followings.includes(userProfile?._id) ? true : false);
  const handleClick = async () => {
    try {
      if (followed) {
           
        await userRequest.put(`/users/${userProfile._id}/unfollow`, {
          userId: currentUser._id,
        });
        // dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        console.log('follow')
        await userRequest.put(`/users/${userProfile._id}/follow`, {
          userId: currentUser._id,
        });
        // dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };
  const HomeRightbar = () => {
    return (
      <>
        {/* <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        <img className="rightbarAd" src="assets/panner.jpg" alt="" />
        <h4 className="rightbarTitle">Người liên hệ</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {userProfile._id !== currentUser._id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{userProfile.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{userProfile.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {userProfile.relationship === 1
                ? "Single"
                : userProfile.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {
            friends.map(friend =>{
               return (
                 <Link key={friend._id} style={{textDecoration : 'none',color : 'black'}} to={`/profile/${friend._id}`}>
                <div className="rightbarFollowing">
                <img
                  src={friend.profilePicture ||BF + 'noAvatar.jpg'}
                  alt=""
                  className="rightbarFollowingImg"
                  />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
                  </Link>
               )
            })
          }
          
          
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {userProfile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
