import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { userRequest } from '../../requestMethod'
import CardStory from './CardStory'
import { useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import { ArrowForward } from '@material-ui/icons';

const Cards = styled.div`

 /* background-color: white;
 background-color: rgb(24,25,26); */
 position: relative;
 height: 170px;
 display: flex;
 margin: 20px;
    /* position: absolute; 
  z-index: 999;   */
`
const Card = styled.div`
 
 width: 16.66%;
 box-sizing: border-box;
 margin-right: 10px;
 height: 100%;
 border-radius: 15px;
 border: 1px solid black;
 position: relative;
 overflow: hidden;
 cursor: pointer;

`
const BigImg = styled.img`
  height: 70%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.8;
  
`
const TextContainer = styled.div`
  background-color: #242526;
  height: 30%;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
   
`
const Icon = styled.div`
   width: 40px;
   height: 40px;
   position: absolute;
   background-color: rgb(240,242,245);
   display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  right: 0px;
  top: 50%;
  cursor: pointer;
  z-index: 1;
`
export default function Story() {
  const[storys,setstorys] = useState([]);
  const {currentUser} = useSelector(state => state.user)
  const history = useHistory();
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(()=>{
    const getStorys = async ()=>{
        const res = await userRequest.get('storys');
        setstorys(res.data);
    }
    getStorys()
  },[])
  
  return (
      <Cards>
         <Card onClick={()=> history.push('/stories/create')}  >
            <BigImg src={ currentUser?.profilePicture || BF+'noAvatar.jpg'} />
             <TextContainer > Tạo Tin </TextContainer>
         </Card>
         {
             storys.map(s =>{
                 return <CardStory story={s} />
             })
         }
         <Icon onClick={()=>history.push('/stories')}><ArrowForward /> </Icon>
      </Cards>
   
  )
}
