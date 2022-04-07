import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteBalloons } from '../../redux/ballonsReducer';
import { openConver } from '../../redux/ConverReducer';
import { userRequest } from '../../requestMethod';
const Balloon = styled.div`
  width: 50px;
  height: 50px;
  cursor: pointer;
`
const Img = styled.img`
   width: 50px;
  height: 50px;
  border-radius:50% ;
`
export default function Ballon({ballons}) {
  const dispath = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser) ;
  const[user,setUser] = useState(null)
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
     const rep = ({
      converid : ballons,
       userid : currentUser._id
     })
    const getmember = async ()=>{
       userRequest.post('conversations/member/ballons',rep)
      .then(res => {
          userRequest.get(`users/${res.data}`).then( data =>  setUser(data.data))
      })
        
    }
     getmember();
  },[ballons])
  const zomIn = (e)=>{
    e.preventDefault();
    dispath( openConver(ballons));
    dispath(deleteBalloons(ballons))
  }
  return (
    <Balloon onClick={zomIn}>
          <Img src={user?.profilePicture ||BF + `noAvatar.jpg` }/> 
    </Balloon>
  )
}
