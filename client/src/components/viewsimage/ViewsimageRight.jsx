
import { ArrowDropDown, Menu, Message, NotificationImportant, Notifications } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../../requestMethod';
import CommentContainer from '../comments/CommentContainer';

const Container = styled.div`
    background-color: rgb(36,37,38);
    flex: 3;
    display: flex;
    flex-direction: column;
    height: 100%;
   position: relative;
   flex-wrap: wrap;
`
const IConsContainer = styled.div`
   display: flex;
   height: 55px;
    align-items: center;
    position: absolute;
    right: 15px;
    top: 5px;
    width: 95%;
    justify-content: right;
    border-bottom: 1px solid rgb(62,64,66);
  
`
const Icon = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(58,59,60);
    font-size: 25px;
    border-radius: 50%;
     color: rgb(228,230,235);
     margin-right: 15px;
`
const MainContainer = styled.div`
 width: 100%;
 margin-top: 70px;
 margin-left: 15px;
 height: 100px;
`
const UserContainer = styled.div`
 height: 40px;
 width: 100%;
 display: flex;
 align-items: center;

`
const Avartar = styled.img`
  width: 40px;
  height:  40px;
  border-radius: 50%;
  margin-right: 10px;
`

const NameAnddate = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
`
const Title = styled.div`
  color: #acb3bb;
  font-size: 15px;
  margin-top: 5px;
  font-weight: 500;
`
const Bottom = styled.div`
  margin-left: 10px;
  margin-right: 30px;
  display: flex;
  color: rgb(155,158,162);
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgb(62,64,66);
    /* border: 1px solid white; */
    
`
const BottomLeft = styled.div`
 display: flex;
    align-items: center; 
    /* margin-left  : 10px; */
    padding-bottom: 10px;
`
const Img = styled.img`
 width: 24px;
    height: 24px;
    margin-right: 5px;
    cursor: pointer;
`
const Span = styled.span`
  font-size: 15px;
`
const BottomRight = styled.div`
 /* margin-right: 15px; */
`
const SpanCmt = styled.span`
    cursor: pointer;
    border-bottom: 1px dashed gray;
    font-size: 15px;
    /* margin-right: 15px; */
   
`
export default function ViewsimageRight({post}) {
   const[user,setUser] = useState({})
   const [like,setLike] = useState(null);
   const [isLiked,setIsLiked] = useState(false);
   const BF = process.env.REACT_APP_PUBLIC_FOLDER;
   const {currentUser} = useSelector(state => state.user)

   useEffect(()=>{
     post && setLike(post.likes.length)
   },[post])
   useEffect(() => {
   post && setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post?.likes]);
   useEffect( ()=>{
      const getUser = async ()=>{
        const res = await userRequest.get(`users/${post.userId}`)
        setUser(res.data)
      }
     post !== null && getUser();
   },[post])
   console.log(isLiked);
   const likeHandler = async ()=>{
    try {
      const res =await userRequest.put(`posts/${post._id}/like`, {userId : currentUser._id})
    
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
  <Container>
    <IConsContainer>
        <Icon> <Menu /> </Icon>
        <Icon><Message /> </Icon>
        <Icon> <Notifications /> </Icon>
        <Icon> <ArrowDropDown /> </Icon>

    </IConsContainer>
    <MainContainer>
        <UserContainer >
          <Avartar src= {user.profilePicture ||BF+ `noAvatar.jpg` } />
          <NameAnddate >
             {user.username}
          </NameAnddate>
        </UserContainer>
        <Title>{post?.desc}</Title>
    </MainContainer>
    <Bottom >
      <BottomLeft>
         <Img onClick={likeHandler} src={isLiked ?  BF +"heart.png" :  BF +"heart.png"} />
         <Span >{like} people like it</Span>
      </BottomLeft>
      <BottomRight>
        <SpanCmt >comments</SpanCmt>
      </BottomRight>
    </Bottom>
    <CommentContainer type='viewimage' post={post} />
  </Container>
  )
}
