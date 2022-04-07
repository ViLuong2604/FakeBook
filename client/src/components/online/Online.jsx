import { useDispatch, useSelector } from "react-redux";
import { openConver } from "../../redux/ConverReducer";
import { userRequest } from "../../requestMethod";
import "./online.css";

export default function Online({user}) {
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {currentUser} = useSelector(state => state.user)
  const dispath = useDispatch(); 
  const HandleNewRoomchat = async ()=>{
    
    const findRoom =await userRequest.get(`conversations/find/${currentUser._id}/${user._id}`);
    if(findRoom.data === null){
      
      const newChatroom =await userRequest.post(`conversations`,{
        senderId : currentUser._id,
        receiverId : user._id
      });
      dispath(openConver(newChatroom.data._id));
      // console.log(findRoom.data_id);
    }else{
     
       dispath(openConver(findRoom.data._id));
    }
  }
  return (
    <li className="rightbarFriend" onClick={HandleNewRoomchat}>
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={ user?.profilePicture ||BF+ 'noAvatar.jpg'} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
