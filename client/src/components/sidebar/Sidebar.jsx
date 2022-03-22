import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import CloseFriend from "../closeFriend/CloseFriend";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {Link, useHistory} from 'react-router-dom'
import { axiosInstance } from "../../config";


export default function Sidebar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const history = useHistory()

  const handleclick = async() =>{ 
    history.push('/messenger')
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          
        </Link>
        
            <span className="sidebarListItemText" style={{paddingLeft:'20px'}}>{user.username}</span>
          </li>
          <button onClick={handleclick} style={{textDecoration:'none',paddingLeft:'5px',color:"black",border:"none",background:'transparent',cursor:'pointer'}}><li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li></button>
            <li className="sidebarListItem">
          <Link style={{textDecoration:'none',color:"black",border:"none",background:'transparent',cursor:'pointer'}} to={`/weather`}>
          <img
            src='https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/kULMG0uFcEQ.png'
            alt=""
            className="topbarImg"
          />
          <span className="sidebarListItemText" style={{paddingLeft:'10px'}}>weather</span>
        </Link>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}
