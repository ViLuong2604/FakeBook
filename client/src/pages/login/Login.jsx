import { useRef } from "react";
import "./login.css";
import { useSelector,useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import {CircularProgress} from '@material-ui/core';
export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispath = useDispatch();
  const user = useSelector(state => state.user)
  const {isFetching,error} =useSelector(state => state.user)
  const handleClick = (e)=>{
    e.preventDefault();
   login( dispath,{email : email.current.value , password : password.current.value})
   
  }
  
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">FakeBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on FakeBook.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick}>
          <form className="loginBox">
            <input placeholder="Email" type='email' required ref={email} className="loginInput" />
            <input placeholder="Password" type='password' required ref={password} className="loginInput" />
            <button className="loginButton" disabled={isFetching} type="submit" >{isFetching ?
             <CircularProgress color="white" size="20px" /> : 'Log In'}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
