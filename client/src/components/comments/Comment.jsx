import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { userRequest } from '../../requestMethod';
import { useDispatch, useSelector } from 'react-redux'
import FormComment from './FormComment';
import { setHiddenModal, setType } from '../../redux/comment';
const ContainerCmt = styled.div`
  
  border: 1px solid white; 
   ${
     props => props.type && `border: 1px solid rgb(36,37,38)`
   }
`
const Container = styled.div`
    height: 40px;
  
   padding-bottom: 10px;
    margin-left: 10px;
    ${
      props => props.st === 'reply'? `
      width: 80%;
      margin-left: 10%;
      ` : ` width: 100%;   `
    }
    
    
    display: flex;
   align-items: center;
   
   margin-bottom: 10px;
   
`
const Img = styled.img`
    margin-top: 3px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: contain;
    
`
const Right = styled.div`
  
    height: 37px;
    padding-left: 15px;
    border-radius: 25px;
    background-color: #F0F2F5;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    
    ${
      props => props.type && `background-color: rgb(58,59,60);
      color: #acb3bb;`
    }
   
   margin: 10px 2px;
`
const Other = styled.div`
    margin-top :5px ;
  
    display: flex;
   *{
       margin-right: 5px;
     &:hover{
       border-bottom: 1px solid black;
     }
   }
`
const P = styled.p`
    font-size: 13px;
    cursor: pointer;
`
export default function Comment({cmt,comments,post,setComments,type,style,setActiveComment,activeComment}) {
  const {currentUser} = useSelector(state => state.user)
  const[user,setUser]= useState(null);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispath = useDispatch();
  const typeCmt = useSelector(state => state.comments.type);
  const isEditing =
  activeComment &&
  activeComment.id === cmt._id &&
  activeComment.type === "editing";
const isReplying =
  activeComment &&
  activeComment.id === cmt._id &&
  activeComment.type === "replying";
  useEffect(()=>{
    const fetchPost = async ()=>{
      const res = await userRequest.get(`users/${cmt.userid}`)
    setUser(res.data)
    }
    fetchPost();
  },[cmt])
  const HandleDelete = async()=>{
    dispath(setHiddenModal(true));

      
  }
  
  useEffect(  ()=>{ 
        if(typeCmt === 'delete'){
          userRequest.delete(`comment/${cmt._id}`)
          .then( data => {
            const res = comments.filter( c => c._id !== cmt._id);
            setComments(res);
            dispath(setType('none'))
          })
       
        }
  },[typeCmt])
  return (
    <ContainerCmt type={type}>
    <Container type={type} st={style}>
      <Img src={user?.profilePicture || BF +"noAvatar.jpg"}/>
      <Right type={type} >
         <P style={{fontSize :'14px',fontWeight : '500'}}>{  user?.username}</P>
         <P>{cmt?.body}</P>
         <Other> 
             {/* <P>Thích</P> */}
             <P onClick={()=> setActiveComment({id:cmt._id ,type: 'replying',username : user.username }) } >Phản hồi</P>
             {/* {
               cmt?.userid === currentUser._id &&   <P onClick={()=> setActiveComment({id:cmt._id ,type: 'editing'  }) }>chỉnh sửa</P>
              } */}
             {
               cmt?.userid === currentUser._id &&  <P onClick={HandleDelete} >Xóa</P>
              }
            
             
         </Other>
      </Right>
     
    </Container>
   {
     isReplying && <FormComment type={type} setActiveComment={setActiveComment} activeComment={activeComment} style='rep' post={post}  cmt={cmt} comments={comments} setComments={setComments} />
    }
    </ContainerCmt>
  )
}
