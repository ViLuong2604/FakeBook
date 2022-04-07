import { Close, Mood, PhotoCamera, Send } from '@material-ui/icons'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { userRequest } from '../../requestMethod'
import Picker from 'emoji-picker-react';
import Emoji from './Emoji'
const Container = styled.div`
    height: 37px;
    position: relative;
    display: flex;
   align-items: center;
   
     margin: 10px;  
   
  ${
      props => props.st === 'rep' ? `
      width: 90%;
      margin-left: 10%;
    
      `: `width: 100%;`
  }
`

const Img = styled.img`
    
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: contain;
    
`
const Orther = styled.div`
margin-left: 5px;
    width: 90%;
    display: flex;
    height: 100%;
   
    align-items: center;
    background-color: rgb(240,242,245);
    border-radius: 25px;
    overflow: hidden;
   
    ${
        props => props.type &&  ` width: 85%;
        background-color: rgb(58,59,60);`
    }
`
const Input = styled.input`
 height: 100%;
 margin-left: 5px;
width: 80%;
outline: none;
border: none;
background-color: rgb(240,242,245);

font-size: 15px;
${
        props => props.type &&  ` 
        color: rgb(228,230,235);
        background-color: rgb(58,59,60);`
    }
`
const Icons = styled.div`
  /* position: relative; */
  display: flex;
  
  ${
      props => !props.st  &&  "margin-left: 20px;"
  }
 *{
     cursor: pointer;
 }
 ${
        props => props.type && 
         ` 
         *{
            color: rgb(228,230,235);
           }
        
       `
    }
`
const DIV = styled.div`
    background-color: black;
    width: 300px;
    height: 200px;
    position: absolute;
    z-index: 111;
    border-radius: 8px;
    top: -210px;
    /* margin-top:  40px; */
    right: 50px;
   margin-bottom: 220px;
  
`
export default function FormComment({cmt,post,style,comments,setComments,setActiveComment,type,activeComment}) {
    const {currentUser} = useSelector(state => state.user);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const[hiddenEmoji,setHiddenEmoji] = useState(false)
    const[body,setBody] = useState('');
    const BF = process.env.REACT_APP_PUBLIC_FOLDER;
    const id = cmt ?  (cmt.parenid ? cmt.parenid : cmt._id ): null ;
    const newComment ={
        body ,
        userid : currentUser._id,
        parenid : id,
        postId : post?._id
    }
    const HandleCreateComment =async ()=>{
        const res = await userRequest.post(`comment`,newComment);
        setComments(pre => [...pre,res.data]);
        setBody('');
        setHiddenEmoji(false)
        setActiveComment && setActiveComment(null);
    }
    const onEmojiClick = (event, emojiObject) => {
        // setChosenEmoji(emojiObject);
       setBody(body +emojiObject.emoji)
      };
  return (
      <>
        
   <Container st={style}>
        {
            hiddenEmoji &&  <DIV>
                {/* <Picker 
                disableSearchBar
                groupVisibility
        pickerStyle={{width: '100%' ,height: '100%'}} 
    onEmojiClick={onEmojiClick} /> */}
                 <Emoji setNewMessenger={setBody} newMessenger={body} />
            </DIV>
        }
      
       <Img src={currentUser?.profilePicture || BF + 'noAvatar.jpg' }/>
       <Orther type={type}>
           <Input type={type} value={body} onChange={e=> setBody(e.target.value)} placeholder='viết bình luận ...' />
            
        <Icons type={type} st={style} > 
        
           <Mood style={{flex : '1'}} onClick={()=> setHiddenEmoji(!hiddenEmoji)} /> 
           {
               setActiveComment && <Close style={{flex : '1'}} onClick={()=>setActiveComment(null)}/>
           }
           
           <Send style={{flex : '1'}}  onClick={HandleCreateComment} /> </Icons>
       </Orther>
      
   </Container>
    </>
  )
}
