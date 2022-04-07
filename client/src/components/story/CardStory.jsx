
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { userRequest } from '../../requestMethod'

const Card = styled.div`
 display: flex;
 width: 16.66%;
 box-sizing: border-box;
 margin-right: 10px;
 height: 100%;
 border-radius: 15px;
 position: relative;
overflow: hidden;
/* position: absolute;
z-index: 999; */
cursor: pointer;
  ${props => props.type === 'text' && `
    background-image:  ${props.bg} ;   
  ` 
 }
`
const BigImg = styled.img`
  
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 1;
  
`
const SmallImg = styled.div`
   z-index: 1;
   margin: 15px 15px;
   position: absolute;
   border-radius: 50%;
   width: 35px;
   height: 35px;
  
   border: 3px solid black;
   overflow: hidden;
`
const Img = styled.img`

  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`
const Text = styled.p`
   display: flex;
   margin-top :50%;
   margin-left: 10%;
   font-size: 13px;
`
const UserName= styled.div`
position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 color: white;
 font-size: 15px;
 font-weight: 500;
 width: 100%;
bottom: 10px;

`
export default function CardStory({story}) {
    const[user,setUser] = useState({});
    const history = useHistory();
    const BF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
        const getUser = async ()=>{
            const res = await userRequest(`users/${story.userId}`);
            setUser(res.data)
        }
        getUser();
    },[story])
  return (
        <Card onClick={()=>history.push('/stories')} bg={story.bg} type={story.img  ? 'image' : 'text' } >
          {
            story.img ? <BigImg src={story.img} /> :<Text > {story.text}</Text>
            
          }
           
            <SmallImg>
               <Img src={user.profilePicture ||BF + 'noAvatar.jpg'}/>
            </SmallImg> 
            <UserName>{user.username}</UserName>
        </Card>
  )
}
