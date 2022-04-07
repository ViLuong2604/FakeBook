import { Add, AddCircleOutline, AddCircleOutlined, Close, Gif, InsertPhoto, Mood, Remove, Send } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled  from 'styled-components'
import { openBalloons } from '../../redux/ballonsReducer'
import { deleteConver } from '../../redux/ConverReducer'
import { userRequest } from '../../requestMethod';
import { io } from "socket.io-client";
import Chat from './Chat';
import './test.js'

//  import Picker,{SKIN_TONE_MEDIUM_DARK} from 'emoji-picker-react';

import Emoji from '../comments/Emoji'
const Container = styled.div`
    height: 100%;
    width: 350px;
    background-color: rgb(36,37,38);
    color: rgb(223,225,230);
    border-radius: 8px;
    position: relative;
    box-sizing: border-box;
`
const Top = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 2px  solid rgb(47,48,49);
    height: 40px;
`
const User = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 5px;
`
const UserName = styled.div`
    /* border: 1px solid white; */

    height: 35px;
    /* margin-bottom: 15px; */
    /* *{
      margin: 0;
      padding: 0;
    } */
   
`
const P = styled.p`
    
`
const Other = styled.div`
    *{
        margin-right: 10px;
        cursor: pointer;
    }
`
const Main = styled.div`
    width: 100%;
    height: 70%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
      color: red;
      background-color: red;
    }
    &::-webkit-slider-thumb {
    background-color: red;
  }
  
`
const Bot = styled.div`
  position: absolute;
    margin-top: 6px;
    display: flex;
    align-items: center;
    /* border: 1px solid white; */
    bottom: 15px;
    
`
const BotLeft = styled.div`
    display: flex;
    align-items: center;
    *{
        margin-left: 10px;
    }
`
const BotRight = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    *{
      cursor: pointer;
    }
`
const Input = styled.input`
  min-height: 40px; 
   width: 190px;
   border: none;
   outline: none;
   border-radius: 25px;
  background-color :  rgb(58,59,60);
  padding-left: 10px;
  color: white;
   max-width: 190px; 
  word-wrap: break-word;
  ::placeholder{
      font-size: 15px;
      
  }
`
const DIV = styled.div`
    background-color: black;
    width: 300px;
    height: 200px;
    position: absolute;
    z-index: 111;
    bottom: -150px;
    margin-right: 15px;
    /* margin-top:  40px; */
    right: 50px;
   margin-bottom: 220px;
   border-radius: 5px;
   overflow: hidden;
  
`

export default function MiniChat({conver}) {
    const[newMessenger,setNewMessenger] = useState('');
    const {currentUser} = useSelector(state => state.user);
    const dispath = useDispatch();  
    const [messages, setMessages] = useState([]);
    const[user,setUser] = useState(null);
    const[hiddenEmoji,setHiddenEmoji] = useState(false);
    const scrollRef = useRef();
    const[memberOther,setMemberOther]= useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef();
    const[members, setMembers] = useState([]);
    const BF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(()=>{
         setMembers([currentUser._id,memberOther]);
    },[memberOther])
    useEffect(()=>{
      socket.current =io("ws://localhost:8900");
      socket.current.on("getMessage", (data) => {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      });
    },[])
    useEffect(() => {
      socket.current.emit("addUser",currentUser._id);
      
    }, []);
    useEffect(()=>{
        const rep = ({
         converid : conver,
          userid : currentUser._id
        })
       const getmember = async ()=>{
          userRequest.post('conversations/member/ballons',rep)
         .then(res => {
           setMemberOther(res.data);
             userRequest.get(`users/${res.data}`).then( data =>  setUser(data.data))
         })
           
       }
        getmember();
     },[conver])
     useEffect(() => {
      arrivalMessage &&
       members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, members]);
     useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);
    useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    useEffect(()=>{
        const getMessager = async ()=>{
          try {
           const res = await userRequest.get(`messages/${conver}`)
           setMessages(res.data)
          } catch (error) {
            console.log(error);
          }
        }
        getMessager();
     },[conver])
     const handleSubmit = async (e) => {
        e.preventDefault();
        setHiddenEmoji(false)
        const message = {
          sender: currentUser._id,
          text: newMessenger,
          conversationId: conver,
        };
        // const receiverId = currentChat.members.find(
        //   (member) => member !== user._id
        // );
      
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId : memberOther,
          text: newMessenger,
        });
        try {
          const res = await userRequest.post("messages", message);
          setMessages([...messages, res.data]);
          setNewMessenger("");
        } catch (err) {
          console.log(err);
        }
      };
      const zomOut = (e)=>{
        e.preventDefault();
        dispath(openBalloons(conver));
        dispath(deleteConver(conver))
      }
      const exitChat = (e)=>{
        e.preventDefault();
        dispath(deleteConver(conver));
       
      }
      const onEmojiClick = (event, emojiObject) => {
        // setChosenEmoji(emojiObject);
       setNewMessenger(newMessenger +emojiObject.emoji)
      };
      useEffect(()=>{
        // const pikeremoji = document.getElementById('pickerEmoji');
           
        // pikeremoji.addEventListener('emoji-click', event => {
        //   console.log(event.detail); // will log something like the above
        // });
      },[])
// backgroundColor : 'black'

    //  document.querySelector('emoji-picker').addEventListener('emoji-click', event => console.log(event));
  return (
    <Container>
        {
            hiddenEmoji &&<DIV  >
            {/* <Picker 
            groupNames
                    disableSearchBar
                    groupVisibility
                    disableSkinTonePicker
            pickerStyle={{width: '100%' ,height: '100%',}} 
           
        onEmojiClick={onEmojiClick} /> */}
              {/* <emoji-picker onClick={e=> console.log(e)} id='pickerEmoji' class='dark' emojiClick={e=> console.log(e)} 
               style={{width: '100%' ,height: '100%'}}
              /> */}
    
             <Emoji newMessenger={newMessenger} setNewMessenger={setNewMessenger} />
            </DIV>
        }
        
        <Top>
            <User >
                <Img src={user?.profilePicture ||BF + `noAvatar.jpg` } />
                <UserName>
                    <P style={{fontSize : '15px',fontWeight : '500'}}>{user?.username}</P>
                   
                     <P style={{fontSize : '13px',fontWeight : '100'}}>Đang hoạt động</P> 
                </UserName>
            </User>
            <Other > 
                <Remove onClick={zomOut} />
                <Close onClick={exitChat} />
                
            </Other>
        </Top>
        <Main className='main' >
            {
                messages.map((m,i) => <div ref={scrollRef}>

                  <Chat key={m._id} 
                 trunglap = { (i!==0 && messages[i-1]?.sender !== currentUser._id)}
                 mess={m} own={(m.sender === currentUser._id)  } />
                </div>
                
                )
            }
          
        </Main>
        <Bot >
           <BotLeft >
               <AddCircleOutlined />
               <InsertPhoto />
               <Gif style={{fontSize : '35px'}} />
           </BotLeft>
           <BotRight>
                    <Input value={newMessenger} onChange={(e)=> setNewMessenger(e.target.value)}  placeholder='Aa' />
                    <Mood onClick={()=> setHiddenEmoji(!hiddenEmoji)} style={{position : 'absolute',right : '45px'}} />
                    <Send onClick={handleSubmit} style={{marginLeft : '10px'}} />
           </BotRight>
        </Bot>
    </Container>
  )
}
