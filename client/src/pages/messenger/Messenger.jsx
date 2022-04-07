import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/messenger/Message";
import Topbar from "../../components/topbar/Topbar";
import { userRequest } from "../../requestMethod";
import { io } from "socket.io-client";
import "./messenger.css";



export default function Messenger() {
  const user = useSelector(state => state.user.currentUser)
  const[conversations,setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlinesUser,setOnlinesUser] = useState([]);
  const scrollRef = useRef();
  const[newMessenger,setNewMessenger] = useState('')
  const [messages, setMessages] = useState([]);
  const socket = useRef();
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
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("addUser",user._id);
    socket.current.on("getUsers", (users) => {
      setOnlinesUser( user.followings.filter((f) => users.some((u) => u.userId === f)))
    });
  }, []);
 
  useEffect(()=>{
     const getConversation = async ()=>{
       try {
        const res = await userRequest.get(`conversations/${user._id}`)
        setConversation(res.data)
       } catch (error) {
         console.log(error);
       }
     }
     getConversation();
  },[])
  useEffect(()=>{
    const getMessager = async ()=>{
      try {
       const res = await userRequest.get(`messages/${currentChat?._id}`)
       setMessages(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    getMessager();
 },[currentChat])
 const handleSubmit = async (e) => {
  e.preventDefault();
  const message = {
    sender: user._id,
    text: newMessenger,
    conversationId: currentChat._id,
  };
  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
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
useEffect(() => {
  scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
              {
                conversations.map( c =>{
                  return <div onClick={() => setCurrentChat(c)}>
                 <Conversation conversation={c} currentUser={user}  />
              </div>
                })
              }
          </div>
        </div>
          <div className="chatBox">
          <div className="chatBoxWrapper">
        {
          currentChat? <>
                <div className="chatBoxTop">
                
                   
                      {
                        messages.map( m =>{
                          return  <div ref={scrollRef} >
                          <Message message={m} own={m.sender === user._id}  />
                          </div>
                        })
                      }
                      
                   
                  
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={ e => setNewMessenger(e.target.value)}
                    value={newMessenger}
                  ></textarea>
                  <button onClick={handleSubmit} className="chatSubmitButton" >
                    Send
                  </button>
                </div>
              
            
         
          </> : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )
        }
        
        </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline 
            onlinesUser={onlinesUser}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}