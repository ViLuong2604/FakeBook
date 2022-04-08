import "./post.css";
import { FavoriteOutlined, MoreVert } from "@material-ui/icons";
import { publicRequest, userRequest } from "../../requestMethod";
import { useEffect, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import {format} from 'timeago.js'
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components'
import CommentContainer from "../comments/CommentContainer";
import { setType } from "../../redux/comment";
const ImageContainer = styled.div`
   margin-top: 20px;
    width: 100%;
    max-height: 500px;
    display: grid;
    position: relative;
    grid-template-columns: calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12) calc(100%/12);
    ${
      
      props => props.length <3 ? `grid-template-rows: 100% ;` : `grid-template-rows: 50% 50%;`
    }
     * {
    &:nth-child(1) {
      
      ${
        props => props.length ===1 ? `
        grid-column-start: 1;
         grid-column-end: 13;
        ` : `grid-column-start: 1;
      grid-column-end: 7;`
      }
      }
    }
    }
    * { 
    &:nth-child(2) {
      grid-column-start: 7;
      grid-column-end: 13;
      }
    } 
    * { 
    &:nth-child(3) {
      grid-column-start: 1;
      grid-column-end: 5;
      ${
        props => props.length ===3 && `
        grid-column-start: 1;
         grid-column-end: 13;
        ` 
      }
      ${
        props => props.length ===4 && `
        grid-column-start: 1;
         grid-column-end: 7;
        ` 
      }
      ${
        props => props.length >=5 && `
        grid-column-start: 1;
         grid-column-end: 5;
        ` 
      }
      }
    } 
    * { 
    &:nth-child(4) {
     
      ${
        props => props.length ===4 && `
        grid-column-start: 7;
         grid-column-end: 13;
        ` 
      }
      ${
        props => props.length >=5 && `
        grid-column-start: 5;
         grid-column-end: 9;
        ` 
      }
      }
    } 
    * { 
    &:nth-child(5) {
      grid-column-start: 9;
      grid-column-end: 13;
      /* ${
        props => props.length ===4 && `
        grid-column-start: 7;
         grid-column-end: 13;
        ` 
      }
      ${
        props => props.length >=5 && `
        grid-column-start: 5;
         grid-column-end: 9;
        ` 
      } */
      }
    } `
    
    const Icon = styled.div`
       width: 24px;
    height: 24px;
    margin-right: 5px;
    cursor: pointer;
    object-fit: cover;
    background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
    `
const ImageItem = styled.div`
  cursor: pointer;
`
const Lopphu = styled.div`
   position: absolute;
   opacity: 0.4;
   z-index: 111;
  bottom: 0;
  right: 0;
  width: 33.3%;
  height: 50%;
  background-color: black;
  color: white;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  font-size: 55px;
`
export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false);
  const[users,setUsers] = useState({});
  const[hiddenComment,setHiddenComment] = useState(false)
  const history = useHistory();
  const {currentUser} = useSelector(state => state.user)
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispath = useDispatch();
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  const likeHandler = async ()=>{
    try {
      const res =await publicRequest.put(`posts/${post._id}/like`, {userId : currentUser._id})
     
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  useEffect(()=>{
    const fetchPost = async ()=>{
      const res = await publicRequest.get(`users/${post.userId}`)
    setUsers(res.data)
    }
    fetchPost();
  },[post.userId])
  
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link style={{textDecoration : 'none'}} to={`profile/${post.userId}`}>
            <img
              className="postProfileImg"
              src={users.profilePicture ||BF+ `noAvatar.jpg` }
              alt=""
            />
           
            </Link>
            <span className="postUsername">
              {users.username}
            </span>
            <span className="postDate">{ format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <ImageContainer length={post.img.length} >
            {
              post.img.map((i,idex)=> {
               return (
                idex <5  ? <ImageItem  onClick={()=> history.push(`/image/${post._id}`)}>
                 <img className="postImg" src={i} alt="" />

                     </ImageItem> : <Lopphu onClick={()=> history.push(`/image/${post._id}`)}> {post.img.length -5}+ </Lopphu>
               )                  
              })
            }
          </ImageContainer>
          
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {
              isLiked ? <>
                 <img className="likeIcon" src={   BF +"heart.png" } onClick={likeHandler} alt="" /> 
              </>: <>
              <Icon ><FavoriteOutlined style={{cursor : 'pointer'}} onClick={likeHandler} /> </Icon>
              </>
            }
           
            
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={()=> setHiddenComment(!hiddenComment)}> comments</span>
          </div>
        </div>
      </div>
      {
       hiddenComment &&  <CommentContainer post={post}  />
      }
     
    </div>
  );
}
