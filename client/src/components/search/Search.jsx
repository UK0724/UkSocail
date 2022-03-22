import React, { useContext, useEffect } from "react";
import { Search } from "@material-ui/icons";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";



function Searchcomponent({searchText,searchResult,setSearchText,setSearchResult}) {

   const {user} = useContext(AuthContext)

   useEffect(() =>{
    const getdata =  async () =>{
      try{
      const res = await axiosInstance.get('users/allpeople')
      setSearchResult(res.data.filter(item => item._id !== user._id))
      }
      catch(err) {
        console.log(err);
      }
    }
    getdata()
   },[])

  return (
    
    <div className="topbarCenter">
      <div className="searchbar">
        <Search className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
          value = {searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Searchcomponent;
