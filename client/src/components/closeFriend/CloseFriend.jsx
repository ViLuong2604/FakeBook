import "./closeFriend.css";

export default function CloseFriend({user}) {
  const BF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
     
      <img className="sidebarFriendImg" src={BF+'tdttit.jpg'} alt="" />
      <span className="sidebarFriendName">Tuyển dụng thực tập IT</span>
    </li>
  );
}
