import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import Story from "../../components/story/Story";
import styled from 'styled-components'
import MiniChat from "../../components/MiniChat/MiniChat";
import { useSelector } from "react-redux";
import { BorderColor } from "@material-ui/icons";
import Ballon from "../../components/ballons/Ballon";

import { useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";

const Main = styled.div`
  flex:5.5;
`
const MiniChatContainer = styled.div`
 
  /* width:100% ; */
  position: absolute; 
  height: 450px;
  right: 0;
  display: flex;
    /* position: sticky;   */
    position: fixed;
  justify-content: right;
  top: calc(100vh - 450px);
   z-index: 122; 
`
const Icons = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  justify-content: center;
  background-color: rgb(75,76,79);
  color: rgb(227,229,233);
  font-size: 25px;
`
const Balloons = styled.div`
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  *{
    margin-bottom: 15px;
  }
  
`


export default function Home() {
  const hiddenModal = useSelector(state => state.comments.hiddenModal)
  const conver = useSelector(state => state.conver.conver)
  const balloons = useSelector(state => state.ballons.ballons)
 
  const loading = useSelector(state => state.loading.loading)
  // const [loading,setLoading] = useState(false);
  
  
  return (
    <>
      <Topbar />
      <div className="homeContainer">
      
        {
          loading === true &&  <Loading />
        }
        {
          hiddenModal === true &&   <Modal  />
        }
       
        <Sidebar />
        <Main >
        <Story />
        <Feed  />
        </Main>
         <MiniChatContainer>
          {
            conver.map(c =>  <MiniChat conver={c} />)
          }
         <Balloons>
          
           {
             balloons.map(b =>  <Ballon key={b} ballons={ b} />)
           }
          
          <Icons><BorderColor /> </Icons>
         </Balloons>
        </MiniChatContainer>
        <Rightbar/>
      </div>
      
    </>
  );
}
