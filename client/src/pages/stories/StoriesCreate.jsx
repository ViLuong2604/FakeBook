import { async } from '@firebase/util'
import { Image, Settings, TextFormat } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Topbar from '../../components/topbar/Topbar'
import { userRequest } from '../../requestMethod'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase'
import { setLoading } from '../../redux/loading'
import Loading from '../../components/loading/Loading'
const Container = styled.div`
     display: flex; 
    overflow-y: hidden;
    width: 100vw;
    height: calc(100vh - 50px);
    background-color: black;
`
const Left = styled.div`
    flex: 2;
    height: 100%;
    background-color: rgb(36,37,38);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
`
 const LeftInput = styled.input`
   width: 90%;
   height: 185px;
   border: 0.1px solid #3e3e41;
   background-color: rgb(36,37,38);
   border-radius: 8px;
   margin: 15px;
  color: white;
  font-size: 15px;
   ::placeholder{
    
   }
 `
 const LeftSelector = styled.div`
      width: 90%;
      height: 50px;
      border: 0.1px solid #3e3e41;
      background-color: rgb(36,37,38);
      border-radius: 8px;
      margin: 15px;
      color: white;
      display: flex;
        align-items: center;
        justify-content: center;
`
const LeftBGColorSelector = styled.div`
      width: 90%;
      height: 150px;
      border: 0.1px solid #3e3e41;
      background-color: rgb(36,37,38);
      border-radius: 8px;
      margin: 15px;
      
      
      
`
const TextPN = styled.p`
  color: rgb(143,147,150);
  margin: 10px 15px;
`
const ColorSelector = styled.div`
      width: 90%;
      height: 80px;
   
      background-color: rgb(36,37,38);
      border-radius: 8px;
      margin-left: 15px;
      color: rgb(143,147,150);
      display: flex;
      flex-wrap: wrap;
`
const IconsTopLeft = styled.div`
 margin: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Text = styled.p`
  color: white;
  font-size: 25px;
`
const Color =  styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
   background-image:  ${props => props.color} ;
   cursor: pointer;
`
const ButtonContainer = styled.div`
      width: 20%;
       bottom: 0;
       position: fixed;
       z-index: 999;
     
      background-color: rgb(36,37,38);
      
      display: flex;
      flex-wrap: wrap;
      *{
        border-radius : 10px;
        border: none;
        color : white;
      }
`
const ButtonLeft =  styled.button`

 flex:4 ;
  height: 35px; 
  background-color: rgb(58,59,60);
  margin-left: 15px;
  margin-right: 5px;
  cursor: pointer;
`
const ButtonRight =  styled.button`

  flex: 5;
  height: 35px; 
  background-color: rgb(35,116,225);
  margin-right: 15px;
  cursor: pointer;
`
const Icon = styled.div`
   box-sizing: border-box;
   border-radius: 50%;
   width: 35px;
   height: 35px;
   background-color: rgb(58,59,60);
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
`

const UserContainer = styled.div`
 display: flex;
 align-items: center;
 padding: 15px;
 border-bottom: 2px solid rgb(47,48,49);
`
const Avatar = styled.div`
  width: 60px;
  height: 60px;
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
const Right = styled.div`
    flex: 8;
    height: 100%;
    background-color: rgb(24,25,26);
    display: flex;
    align-items: center;
    justify-content: center;
`
const Card = styled.div`
   height: 333px;
   width: 222px;
   border-radius: 15px;
   background-color: white;
   margin-right: 15px;
  background-image:  ${props => props.type ? "linear-gradient(#A649DA, #E45380)" :  "linear-gradient(#654CEF, #8BD8FF)"} ;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  cursor: pointer;
`
const Icon2 = styled.div`
   box-sizing: border-box;
   border-radius: 50%;
   width: 42px;
   height: 42px;
   background-color: rgb(58,59,60);
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
`
const CreateTextContainer = styled.div`
   width: 974px;
   height: calc(100vh - 50px);
   background-color: rgb(36,37,38);
   display: flex;
    justify-content: center;
   align-items:  center; 
   border-radius: 13px;
   flex-direction: column;
   position: relative;
`
const CreateTextWrapper = styled.div`
   width: 40%;
   height: 100%;
   background-color: rgb(24,25,26);
   border-radius: 13px;
   margin: auto;
   display: flex;
   justify-content: center;
   align-items:  center;
`
const XT = styled.p`
   top: 15px ;
   left: 25px;
    color: white;
  text-align: left;
 
  position: absolute;
`
const BigCard = styled.div`
  
   width: 80%;
   height: 94%;
   background-image:  ${props => props.color ?  props.color:  props.image  } ;
   margin: auto;
   border-radius: 13px;
   display: flex;
   justify-content: center;
   align-items:  center;
   word-wrap: break-word;
`
const BigCardText = styled.p`
  max-width: 350px;
  color: white;
  opacity: 0.7;
  font-size: 25px;
  
`
const File = styled.input`
width: 100%;
height: 100%;
opacity: 0;
position: absolute;
z-index: 1;
cursor: pointer;
`
const ImageCreate = styled.img`
   width: 90%;
   height: 90%;
   object-fit: cover;
`
export default function StoriesCreate() {
  const bgColor = ["linear-gradient(#A649DA, #E45380)","linear-gradient(#EAC07B, #58A5A9)",
                   "linear-gradient(#c6ffdd, #fbd786)","linear-gradient(#c471ed, #f64f59)",
                   "linear-gradient(#c31432, #240b36)","linear-gradient(#f12711, #f5af19)"]
  const history = useHistory();
  const[creatStory,setCreatStory] = useState('');
  const[textInput,setTextInput] = useState('Bất đầu nhập...')
  const[color,setColor] = useState(bgColor[0]);
  const[file,setFile]= useState(null);
  const[imagePath ,setImagePath]= useState('');
  const[img ,setImg]= useState('');
  const currentUser = useSelector(state => state.user.currentUser) ;
  const dispath = useDispatch();
  const loading = useSelector(state => state.loading.loading);
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  const createStoryHandle =async ()=>{
    dispath(setLoading(true));
    
     creatStory=== 'text' ? onText() : onImage();
  }
 
  useEffect(()=>{
   file && setImagePath(URL.createObjectURL(file));
  },[file])
  const onText =async ()=>{
    const res = await userRequest.post('storys',{userId :currentUser._id,text: textInput,bg : color });
    res &&  history.push('/');
    res && dispath(setLoading(false));
 }
  const onImage = async () => {
   
    
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             const crate =async ()=>{
                 const res = await userRequest.post('storys',{userId :currentUser._id, img : downloadURL});
                 res &&  history.push('/');
                 res && dispath(setLoading(false));
             }
           crate();
          
        });
      }
    );  
  };
  return (<>
     <Topbar />
     <Container>
         {
         loading === true && <Loading />
       }  
          <Left>
              <IconsTopLeft>
                  <Text>Tin của bạn</Text>
                <Icon> <Settings style={{color : 'white',fontSize : '25px' ,position : 'absolute'}}/> </Icon>
              </IconsTopLeft>
              <UserContainer>
                  <Avatar > 
                      <ImgAvatar src={currentUser?.profilePicture ||BF+ `noAvatar.jpg` } />
                  </Avatar>
                  <Username>{currentUser.username}</Username>
              </UserContainer>
              {
                creatStory === 'text' && <>
                <LeftInput onChange={e=> setTextInput(e.target.value)} placeholder='bất đầu nhập' />
              
              
              <LeftSelector>Gọn Gàng</LeftSelector>
              <LeftBGColorSelector>
                <TextPN>
                     Phong nền
                </TextPN>
                 <ColorSelector>
                 {
                   bgColor.map( (c,index) => <Color onClick={()=> setColor(c)} color={c} key={index}></Color>)
                 }
        
                 </ColorSelector>
              </LeftBGColorSelector>
              
                </>
              }
              {
                creatStory !== '' && <>
                <ButtonContainer>
                <ButtonLeft onClick={()=> {
                  setCreatStory('');
                  setColor(bgColor[0]);
                  setImagePath("");
                }} >Bỏ</ButtonLeft>
                <ButtonRight onClick={createStoryHandle} >Chia sẻ lên bản tin </ButtonRight>
              </ButtonContainer>
                </>
              }
          </Left>
         <Right>
           {
             creatStory ==='' && <>
              <Card >
                  <Icon2>
                     <Image />
                  </Icon2>
                  Tạo tin ảnh
                  <File id='file'  accept=".png,.jpeg,.jpg"onChange={ async (e) => {
                      await setFile(e.target.files[0]);
                      setCreatStory('image');
                      ;
                  } } type='file'></File>
             </Card>
            
              <Card type="right" onClick={()=> setCreatStory('text')}>
                 <Icon2>
                  <TextFormat />
                 </Icon2>
              Tạo tin văn bản
            </Card> 
             </>
           }
             
             {
               creatStory === 'text' && <>
               <CreateTextContainer>
              <XT>Xem Trước</XT>
              <CreateTextWrapper>
                <BigCard  color={color}> 
                  <BigCardText >{textInput}</BigCardText>
                </BigCard>
              </CreateTextWrapper>
            </CreateTextContainer>
               </>
             }
             {
               creatStory === 'image' && <>
               <CreateTextContainer >
              <XT>Xem Trước</XT>
              <CreateTextWrapper>
                 <ImageCreate src={imagePath} />
              </CreateTextWrapper>
            </CreateTextContainer>
              
               </>
             }
            
        </Right> 
     </Container>
  </>
  )
}
