import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [allcomments,setAllcomments] = useState([])

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [comment,post.userId]);

  useEffect(() =>{
    const fetcomment = async() =>{
    const res = await axiosInstance.get("/posts/" + post._id + "/comment")
    setAllcomments(res.data)
    }
    fetcomment()
  },[comment])

  const likeHandler = () => {
    try {
      axiosInstance.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if(comment !== ""){
    try {
      const data = await axiosInstance.put("/posts/" + post._id + "/comment", { text: comment });
      console.log(data)
      setComment("")
    } catch (error) {
      console.log("error");
    }
  }
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span
              className="postCommentText"
              onClick={(e) => setShowComment(!showComment)}
            >
              comments
            </span>
          </div>
        </div>
        <div className="comments">
          {showComment ? (
            <div>
              {allcomments.map((item,id) => {
                return <div className="commenth"  key={id}>{item}</div>;
              })}
            </div>
          ) : (
            <div></div>
          )}
          </div>
          <form onSubmit={handleComment}>
            <input className="commentText" placeholder="What is your opinion about this post? " type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button className="commentSubmit">submit</button>
          </form>
      </div>
    </div>
  );
}
