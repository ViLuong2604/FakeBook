import { Menu } from '@material-ui/core'
import { ArrowDropDown, Chat, MenuOutlined, Mood, NotificationImportant, Notifications } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'

const Container = styled.div`
    flex: 3;
    display: flex;
    cursor: pointer;
`
const User = styled.div`
   margin-left: 25px;
     display: flex;
    align-items: center ; 
    text-align: center;
   
   
    
`
const UserName = styled.p`
   
    font-size: 17px;
    margin: 0;
    padding: 0;
    margin-right: 5px;
    color: white;
    
   
`
const Avatar = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    border-radius: 50%;
`
const Other = styled.div`
    
    display: flex;
    
`
const Icons = styled.div`
     width: 40px;
    height: 40px;
    border-radius: 50%;
    
    background-color: rgb(228,230,235);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    *{
      font-size: 19px;
    }
`
export default function Right() {
  const {currentUser} = useSelector(state => state.user);
  const history = useHistory();
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Container>
        <User  onClick={()=> history.push(`/profile/${currentUser._id}`)}>
           <UserName> {currentUser.username}</UserName>
           <Avatar src={currentUser?.profilePicture ||BF+ `noAvatar.jpg` } />
        </User>
        <Other>
          <Icons><MenuOutlined /> </Icons>
          <Icons><Chat /> </Icons>
          <Icons><Notifications /> </Icons>
          <Icons><ArrowDropDown /> </Icons>
        </Other>
    </Container>
  )
}
