import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
  VideocamOffOutlined,
  VideocamOutlined,
  InsertEmoticon,
} from "@material-ui/icons";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import app from "../../firebase";
import { userRequest } from "../../requestMethod";
import { async } from "@firebase/util";
import { setLoading } from "../../redux/loading";

const Lopphu = styled.div`
 width: 120px;
  height: 120px;
  margin-right: 12px;
 
  position: absolute;
  z-index: 99;
  opacity: 0.4;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 45px;
   bottom: 10px;
  right: 20px; 
  /* position: relative; */
  background-color: black;
  color: white;
 
`
const P = styled.p`

  /* position: absolute; */
  /* z-index: 999; */
 
`
export default function Share() {
  const  user  = useSelector(state => state.user.currentUser)
  const dispath = useDispatch();
  const desc = useRef();
  const [file, setFile] = useState([]);
  const [imgPath, setImgPath] = useState([]);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const submitHandler = async (e) => {
    e.preventDefault();
    const submit = ()=>{
      const newPost = {
        userId: user._id,
        desc: desc.current.value 
      };
      try {
         userRequest.post("/posts", newPost).then( res =>window.location.reload() );
        
      } catch (err) {}
    }
    file.length >0 ?  onImage() : submit() ;
    
  };
  useEffect(()=>{
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
      img : imgPath
       };
    const submit = ()=>{
       userRequest.post("/posts", newPost).then( res =>window.location.reload() );
    }
    if(imgPath.length !==0 && imgPath.length === file.length){
      submit();
      dispath(setLoading(false));
    }
   
  },[imgPath])
  
  const onImage = async () => {
    await dispath(setLoading(true))
     for (let index = 0; index < file.length; index++) {
      const fileName = new Date().getTime() + file[index].name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file[index]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
       async () => {
          
        await  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             
          setImgPath((prevState) => [...prevState, downloadURL]);
            
          });
        }
      );  
       
     }
    //  await dispath(setLoading(false))
  };
 
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ||BF+ 'noAvatar.jpg'}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <div  className="shareImgContainer">
          
        {file.length > 0 && file.map( (f,idx) => (
              
             idx <4 ?   <div className="shareImgItem">

               <img key={idx} className="shareImg" src={URL.createObjectURL(f)} alt="" />
                  <Cancel className="shareCancelImg" onClick={() => {
                    const fi = file.filter((f2,index) => index !== idx);
                    setFile(fi) 
                  }} />
              </div>
                : <Lopphu> <P>{file.length -4}+</P> </Lopphu>
              
        ) ) }
          </div>
   

        <div className="shareBottom" >

          <div className="shareOptions">
          <div className="shareOption">
              <VideocamOutlined htmlColor="red" className="shareIcon" />
             
              <span className="shareOptionText">Video Trực Tiếp</span>
            </div>
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                multiple="multiple"
                accept=".png,.jpeg,.jpg"
                onChange={(e) =>setFile(Array.from(e.target.files))  }
              />
            </label>
           
            
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Cảm xúc/Hoạt động</span>
            </div>
          </div>
          <button className="shareButton" onClick={(e)=>submitHandler(e)} type="submit">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}