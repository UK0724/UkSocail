import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(conversation);
  useEffect(() => {
    const friendId = conversation.members
    let idfriend = 0
    for (let i = 0;i<friendId.length;i++){
      if (friendId[i] !== currentUser._id){
        idfriend = friendId[i]
      }
    }
    // console.log(friendId)
    const getUser = async () => {
      try {
        const res = await axiosInstance.get("/users?userId=" + idfriend);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
