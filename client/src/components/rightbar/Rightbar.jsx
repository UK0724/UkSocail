import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import { axiosInstance } from "../../config";

export default function Rightbar({ User }) {

 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  console.log(User);
  console.log(currentUser);

  const createconv = async() =>{
    const friends =await axiosInstance.get('/users/friends/' + currentUser._id)
    const conversation = await axiosInstance.get('/conversations/' + currentUser._id)
    console.log(conversation.data)
    friends.data.map((item) =>{
      const data = {
        senderId: currentUser._id,
        receiverId: item._id
      }
      axiosInstance.post('/conversations',data).then((res) => console.log(res)).catch(err => console.log(err)) 
    })
    console.log(friends.data);
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log(currentUser)
        const friendList = await axiosInstance.get("/users/friends/" + User._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [User]);

  useEffect(() => {
    console.log(currentUser.followings.includes(User?._id));
    setFollowed(currentUser.followings.includes(User?._id))
  }, [currentUser,User])
  

  const handleClick = async () => {
    try {
      if (followed) {
        await axiosInstance.put(`/users/${User?._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: User?._id });
      } else {
        await axiosInstance.put(`/users/${User._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: User?._id });
        createconv()
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
       
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {User.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow" }
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{User.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{User.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {User.relationship === 1
                ? "Single"
                : User.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key ={friend._id}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {User ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
