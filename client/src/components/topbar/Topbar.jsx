import "./topbar.css";
import { Home } from "@material-ui/icons";

import { Link, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Searchcomponent from "../search/Search";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const logout = () => {
    dispatch({ type: "LOGIN_OUT" });
  };
  console.log(user.profilePicture)
  const handleChange = (item) => {
    const value = {
      username: item.username,
      _id: item._id,
    };
    history.push(/profile/ + item.username);
  };

  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">UkSocial</span>
          </Link>
        </div>

        <Searchcomponent
          searchText={searchText}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
          setSearchText={setSearchText}
        />
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <span className="topbarLink">
                <Home className="home" />
              </span>
            </Link>
          </div>
          <Link
            to={`/profile/${user.username}`}
            className="userTop"
            style={{ textDecoration: "none" }}
          >
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
            <span className="username">{user.username}</span>
          </Link>

          <button className="logoutbtn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="searchuser">
        {searchText === ""
          ? ""
          : searchResult
          ? searchResult
              .filter((item) =>
                item.username.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((item) => {
                return (
                  <ul
                    onClick={() => handleChange(item)}
                    key={item.username}
                    className="searchName"
                    style={{ color: "black" }}
                  >
                    <li style={{ listStyleType: "none", cursor: "pointer" }}>
                      <button className="logoutbtn">{item.username}</button>
                    </li>
                  </ul>
                );
              })
          : " "}
      </div>
    </>
  );
}
