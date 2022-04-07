

import { Add, ArrowBackIos, ArrowForwardIos, ArrowLeftSharp, ArrowRight, ArrowRightAltOutlined, ArrowRightSharp, Close, Image, Pause, PhotoAlbum, PhotoLibrary, PlayArrow, PlaylistAdd, Send, Settings, TextFormat } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Topbar from '../../components/topbar/Topbar'
import { userRequest } from '../../requestMethod'

const Container = styled.div`
     display: flex; 
    
    width: 100vw;
    height:100vh;
    background-color: black;
`
const Left = styled.div`
    flex: 3;
    height: 100%;
    background-color: rgb(36,37,38);
    overflow: scroll;
    overflow-x: hidden;
`
const TopLeft = styled.div`
    height: 50px;
    width: 100%;
    background-color: rgb(36,37,38);
    border-bottom: 2px solid rgb(47,48,49);
    display: flex;
    align-items: center;
`
const TopLeftIcon = styled.div`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-left: 15px;
    background-color:rgb(22,22,23);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    :hover{
     background-color: white;
     color : black;
    }
`

const UserContainer = styled.div`
 display: flex;
 align-items: center;
 padding: 15px;
 cursor: pointer;
 
 ${
   props => props.seletec ==='true' && ' background-color: rgb(58,59,60);'
 }
`
const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`
const ImgAvatar = styled.img`
   height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  
`
const Username = styled.p`
  color: white;
`

const TinContainer = styled.div`
  display: flex;
  color: white;
  font-size: 25px;
  align-items: center;
  justify-content: space-between;
   *{
     margin: 15px;
   }
`
const KLTCD = styled.div`
  display: flex;
  color: rgb(46,124,199);
  font-size: 13px;
  align-items: center;
  
   *{
     margin-left: 15px;
   }
`
const TCB = styled.div`
  display: flex;
  flex-direction: column;
  color: rgb(228,230,235);
  font-size: 18px;
  margin-top: 5px;
  *{
    margin: 2px 15px;
  }
`
const TaoTin = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
  
`
const TaoTinDIV = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(58,59,60);
  color: rgb(53,120,229);
  display: flex;
  align-items: center;
  text-align: center;
 
`
const Right = styled.div`
    flex: 8;
    height: 100%;
    background-color: rgb(24,25,26);
    display: flex;
     align-items: center; 
  
    flex-direction: column;
`
const RightMain = styled.div`
    width:45%; 
    height: 90%;
    background-color: rgb(24,25,26);
    display: flex;
     align-items: center; 
    justify-content: center;
`
const Card = styled.div`
   height: 90%;
   width: 70%;
   position: relative;
   border-radius: 8px;
   background-color: white;
   margin-right: 15px;
   overflow: hidden;
   
  /* background-image:   linear-gradient(#A649DA, #E45380); */
  background-color: black;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
   /* align-items: center;  */
  color: white;
   margin: 15px 0;
  cursor: pointer;
   
  ${ props => props.Bgimg ?  `
    background-image: url(${props.Bgimg});
  `  : `background-image: ${props.Bg};`
}

`
const TimeLineContainer = styled.div`
 width: 100%;
  
  height: 5px;
 display: flex;

`
const TimeLine = styled.span`
  height: 100%;
  flex: 1;
   margin: 5px;
   position: relative;
   border-radius: 3px;
   overflow: hidden;
   background-color: #949394;
   /* ${
     props =>  props.index === props.vt ? `background-color: white ;` : `background-color: #949394 ;`
   } */
`
const TimeLineLoad = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: 0.4s;
  ${
    props => props.index === props.vt  ? `width: ${props.timeLoad}%;` : 
    (props.vt< props.index && `width: 100%;`)
  }
  
`
const TopCard = styled.div`
  height: 45px;
  width: 100%;
  display: flex;
  top: 10px;
  left: 5px;
  position: absolute;
  z-index: 111;
  flex-direction: column;

`
const TopCardUser = styled.div`
  height: 100%;
  flex: 5;
  display: flex;
  margin-top: 15px;
  align-items: center;
  
`
const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const TopCardUserImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right : 7px;
`
const TopCardUserUsername = styled.p`
  
`
const TopCardUserUOther= styled.div`
  flex: 3;
`
const MainCard = styled.div`
  width: 100%;
  height: calc(100%);
  display: flex;
  align-items: center;
  justify-content: center;
`
const MainCardText= styled.p`
  color: white;
  font-size: 25px;
`
const Arrow = styled.div`
  color: white;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgb(36,37,38);
  display: flex;
  align-items: center;
   justify-content: center; 
   cursor: pointer;
   :hover{
    background-color: #69737e;
   }
`
const Nostatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color : rgb(166,179,184);
`
const Bottomcontainer = styled.div`
  display: flex;
  height: 5%;
  width: 45%;
  box-sizing: border-box;
  align-items: center;
`
const BottomInput = styled.input`
  border: 1px solid #FFFFFF;
  width: 50%;
  height: 100%;
  border-radius: 25px;
  background-color : rgb(24,25,26) ;
  outline: none;
  position: relative;
  color: #FFFFFF;
  font-size: 15px;
`
const BottomIcons = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
`
const BottomIcon = styled.div`
  height: 50px;
  height: 50px;
  margin-right : 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  
`
const ImgIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
`
const IconsReactContainer = styled.div`
  position: absolute;
  display: flex;
  height: 20px;
  width: 100%;
  bottom: 10px;
  left: 10px;
  font-size: 15px;
  text-align: center;

`
const IconsReact = styled.div`
   height: 20px;
   width: 20px;
   margin-right: 3px;
`
export default function Stories() {
  const icons = ['like','love','care','haha','wow','sad','angry']
    const currentUser = useSelector(state => state.user.currentUser) ;
    const ref = useRef();
    const[index,setIndex] = useState(0);
    const[users,setUsers] = useState([]); 
    const play = useRef(true);
    const [playPlobal,setPlayPlobal]  = useState(true)
    const[user,setUser] = useState([]);
    const[stories,setStories] = useState([]);
    const [statusStory,setStatusStory] = useState('');
    const history = useHistory();
    const[timeLoad,setTimeLoad] = useState(0);
    const BF = process.env.REACT_APP_PUBLIC_FOLDER;
    const[emojiCurrent,setEmojiCurrent] = useState([]);
    const[indexUser,setIndexUser] = useState(0);
    
    useEffect( ()=>{
        const getUserStory  = async ()=>{
          const res = await userRequest(`storys/userStory/${currentUser._id}`)
          setUsers(res.data)
        }
        getUserStory()
    },[])
   
    const Handleslide =(type)=>{
        
         if(type === 'del'){
           index <= 0 ? setIndex(0) : setIndex(index-1);
         }else{
          index >= stories.length-1  ? setIndex(stories.length-1) : setIndex(index+1);
         }
         clearTimeout(ref.current);
         setTimeLoad(0);       
    }
      const getStoryuser = async(userId)=>{
            const res = await userRequest(`storys/storys/${userId}`)
            const resuser = await userRequest(`users/${userId}`);
            clearTimeout(ref.current);
            setUser(resuser.data);
            setStories(res.data);
            setIndex(0);
            setTimeLoad(5);
    }
     useEffect( ()=>{
      user&&  users.forEach( (f,idx)=>{
          f._id === user._id && setIndexUser(idx)
        }  )
     },[user])
    //  useEffect( ()=>{
    //   stories.length >0 && index >stories[index].img.length && setIndexUser(indexUser+1)
    //  },[index])
    //  useEffect( ()=>{
    //   setUser(users[indexUser])
    // },[indexUser])
  //   useEffect( ()=>{
  //     users.length >0 &&  getStoryuser(users[indexUser]._id)
  //  },[user])
   
    console.log(indexUser);
     useEffect(()=>{
       stories.length >= 1 &&  stories[index]?.img.length >= 1 ? setStatusStory('image') : setStatusStory('text');
       stories.length > 1 && setEmojiCurrent(stories[index]?.emoji);
     },[index,stories]) 
   const HandleEmoji = async (emj)=>{
    const res = await userRequest.put('storys/emoji',{
       id : stories[index]?._id,
       emoji : {userId : currentUser._id , emj : emj}
    })
    res && setEmojiCurrent((pre) => [{userId : currentUser._id , emj : emj} , ...pre])
   }
   useEffect(()=>{
     setPlayPlobal(play.current)
   },[])
   useEffect(()=>{
    setPlayPlobal(play.current)
  },[play.current])
   useEffect(()=>{
     if(stories.length>0 && playPlobal === true){
      ref.current =  setTimeout(() => {
        if(timeLoad > 90){
         index < stories.length-1 &&   setIndex(index+1);
         index < stories.length-1 &&  setTimeLoad(0);
        }else{
          setTimeLoad(timeLoad + 5)
        }
          
     }, 250);
     }
    
   },[timeLoad,playPlobal])
   const handleplay =()=>{
    play.current = !play.current
    setPlayPlobal( play.current)
   }
  
  return (
      <>
      
    <Container>
        <Left>
          <TopLeft>
            
            <TopLeftIcon onClick={ ()=> history.push('/')}> <Close/></TopLeftIcon>
            
          </TopLeft>
          <TinContainer>
            <p>Tin</p>
            <PlaylistAdd />
          </TinContainer>
          <KLTCD>
            <p>kho lưu trữ</p>
            <p>Cài đật</p>
          </KLTCD>
          <TCB>
           <p>Tin của bạn</p>
           <TaoTin onClick={()=> history.push('/stories/create')}>
             <TaoTinDIV  >
               <Add style={{margin : 'auto'}}/>
             </TaoTinDIV>
           </TaoTin>
           <p>Tất cả tin</p>
          </TCB>
          {
            users.map( u =>{
              return  <UserContainer seletec={user._id === u._id ? 'true' : 'false'} onClick={()=> getStoryuser(u._id)}  key={u._id}>
              <Avatar> <ImgAvatar src={u.profilePicture ? u.profilePicture : BF+ 'noAvatar.jpg'  } /> </Avatar>
              <Username>{u.username}</Username>
             </UserContainer>
            })
          }
          
        </Left>

        <Right>
          <RightMain>
          {
           stories.length >0 &&   <Arrow onClick={()=> Handleslide('del')}> <ArrowBackIos/> </Arrow>
          }
        
        {
          stories.length > 0 &&  statusStory === 'image' &&(

            <Card  >
              
              <TopCard>
              <TimeLineContainer>
                {
                  stories.map( (i,idx) => <TimeLine  key={idx}>
                    <TimeLineLoad index={index} vt={idx} timeLoad={timeLoad} ></TimeLineLoad>
                  </TimeLine> )
                }
              </TimeLineContainer >
                <TopCardUser>
                  <TopCardUserImage src=  {user.profilePicture ? user.profilePicture : 'https://raw.githubusercontent.com/safak/youtube/mern-social-app/client/public/assets/person/noAvatar.png'}    />
                  <TopCardUserUsername >{user.username} </TopCardUserUsername>
                </TopCardUser>
                 {
                  playPlobal=== false?  <PlayArrow onClick={handleplay} style={{position : 'absolute',right : '30px',top : '20px',fontSize : '25px'}} /> :
                   <Pause onClick={handleplay} style={{position : 'absolute',right : '30px',top : '20px',fontSize : '25px'}} />
                 }
                  
                
              </TopCard>
             <MainImg src={stories[index]?.img} />
             
             <IconsReactContainer >
         {
                emojiCurrent?.slice(0,5).map((icon,idx)=><IconsReact><ImgIcon src={BF + `icons/${icon.emj}.png`} /> </IconsReact>)
          } 
          {
            emojiCurrent?.length > 0 &&  <>
            Đã gửi cho {user._id === currentUser._id? `chính mình ` : user.username}
            </>
          }
         
         </IconsReactContainer>
        </Card>
            )
        }
        
         {
          stories.length > 1 &&  statusStory === 'text' &&  <Card  Bg={stories[index]?.bg} >
          
           <TopCard>
           <TimeLineContainer>
             {
               stories.map( (i,idx) => <TimeLine  key={idx}>  <TimeLineLoad index={index} vt={idx} timeLoad={timeLoad}></TimeLineLoad></TimeLine> )
             }
           </TimeLineContainer >
             <TopCardUser>
                <TopCardUserImage src=  {user.profilePicture ? user.profilePicture : 'https://raw.githubusercontent.com/safak/youtube/mern-social-app/client/public/assets/person/noAvatar.png'} />
                <TopCardUserUsername >{user.username} </TopCardUserUsername>
             </TopCardUser>
             <TopCardUserUOther>
             </TopCardUserUOther>
             {
                  playPlobal === false ?  <PlayArrow onClick={handleplay} style={{position : 'absolute',right : '30px',top : '20px',fontSize : '25px'}} /> :
                   <Pause onClick={handleplay} style={{position : 'absolute',right : '30px',top : '20px',fontSize : '25px'}} />
                 }
           </TopCard>
           <MainCard>
             <MainCardText>{stories[index]?.text}</MainCardText>
           </MainCard>
           <IconsReactContainer >
         {
                emojiCurrent?.slice(0,5).map((icon,idx)=><IconsReact>
                  <ImgIcon  src={BF + `icons/${icon.emj}.png`} /> </IconsReact>)
          } 
         {
            emojiCurrent?.length > 0 &&  <>
            Đã gửi cho {user._id === currentUser._id? `chính mình ` : user.username}
            </>
          }
         </IconsReactContainer>
         </Card>
         
         }
          
         {
            stories.length >0 &&  <Arrow onClick={()=> Handleslide('add')}> <ArrowForwardIos /> </Arrow>
         }
         
         {
          stories.length <=0 &&  <Nostatus>
                  <PhotoLibrary style={{fontSize : '100px'}} />
                  <p style={{fontSize : '30px'}}>Chọn tin để mởi</p>
            </Nostatus>
         }
          
       </RightMain>
       {
         stories.length > 0 &&  <Bottomcontainer>
         <BottomInput placeholder='Trả lời ...' />  
         {/* <Send style={{color : 'white', position : 'absolute'}} /> */}
         <BottomIcons>
           {
             icons.map((icon,idx)=><BottomIcon><ImgIcon onClick={()=> HandleEmoji(icon)} 
              src={BF + `icons/${icon}.png`} /> </BottomIcon>)
           }             
         </BottomIcons>
    </Bottomcontainer>
       }
      
        </Right>
     
    </Container>
      </>
  )
}
