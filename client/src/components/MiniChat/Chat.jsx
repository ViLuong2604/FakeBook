import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { userRequest } from '../../requestMethod'
const Container = styled.div`
  width: 100%;
  margin-top: 5px;
  display: flex;
  
  align-items: center;
  /* margin-top: 5px; */
  
  ${
    props => props.own && 'justify-content: right;'
  }
`
const Img = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
 margin-left: 10px;
 
  ${
    props => props.trunglap && `opacity: 0;`
  }
`
const Text = styled.div`

padding: 5px;
word-break:  break-all;
border-radius: 15px;
padding-left: 10px;
min-width: 50px;
max-width: 150px;
display: flex;
align-items: center;
background-color: rgb(62,64,66);
  
   ${
    props => props.own && ' background-color: rgb(0,132,255);'
  }
`
export default function Chat({own,mess,trunglap}) {
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const[user,setUser] = useState(null);
  const {currentUser} = useSelector(state => state.user);
  useEffect(()=>{
    const rep = ({
     converid : mess.conversationId,
      userid : currentUser._id
    })
   const getmember = async ()=>{
      userRequest.post('conversations/member/ballons',rep)
     .then(res => {
         userRequest.get(`users/${res.data}`).then( data =>  setUser(data.data))
     })
       
   }
    getmember();
 },[mess])

  return (
    <Container own={own}>
      {
        !own && <Img trunglap={trunglap} src={user?.profilePicture || BF +`noAvatar.jpg` } />
      } 
       <Text own={own}>{mess.text}</Text>
    </Container>
  )
}
