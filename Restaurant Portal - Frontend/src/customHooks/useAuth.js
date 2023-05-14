import React, { useEffect, useState } from "react";
import restaurantApi from "../api/restaurantApi";
import { useCookies } from "react-cookie";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  let getUser = async (email) => {
    let { data } = await restaurantApi.get(`auth/${email}`);
    let user = data.singleUser;
    
    if (user) {
      setCurrentUser(user[0]);
    } else {
      setCurrentUser(null);
    }
  };

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  let getEmail = async () => {
    let { data } = await restaurantApi.get("auth/current-user");
    
    if (!!data.email) {
      getUser(data.email);
    } else {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  return {
    currentUser,
  };
};

export default useAuth;
