import { Close } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { addHistory, deleteHistory, displayHistory } from '../../redux/History'
const P = styled.p`

 
`
const DropdonwItems = styled.div`
 height: 50px;
 margin-right: 50px;
 margin-left: 25px;
 width: 90%;
 display: flex;
 align-items: center;
 font-size: 15px;
 font-weight: 500;
 border-radius: 15px;
 /* border: 1px solid black; */
 
 *{
   cursor: pointer;
 }
 :hover{
  background-color: #b6b9c0;
 }

`
const Img = styled.img`
  width:45px ;
  height: 45px;
  border-radius: 50%;
  object-fit: contain;
`
const DropdownIcon = styled.div`
  
 right: 0;
 
 width:30px ;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: center; 
 
   *{
     :hover{
       color: red;
       cursor: pointer;
     }
   }
  
`
export default function DropdownItems({user,type}) {
  const history = useHistory();
  const dispath = useDispatch();
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleClick =()=>{
    dispath(displayHistory(false));
       dispath(addHistory(user)) ;

       history.push(`/profile/${user._id}`); 
  }
  const handledeleteClick =()=>{
    dispath(deleteHistory(user._id));
      
  }
  return (
     <DropdonwItems  >
               <Img onClick={()=>  handleClick()  } src={user?.profilePicture ||BF+ `noAvatar.jpg` }  />
               <P onClick={()=>  handleClick()  } >{user.username}</P>
               {
                 type  && <DropdownIcon >
                 <Close onClick={handledeleteClick} style={{fontSize : '18px',position : 'absolute',right : '60px'}} /> 
                </DropdownIcon>
               }
              
    </DropdonwItems>
  )
}

