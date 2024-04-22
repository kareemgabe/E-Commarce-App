import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();
// authContext.Provider
// authContext=> object access mn goh Provider
export default function AuthContextProvider({ children }) {
  // each refresh => check localStorage   =>tkn?
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(function () {
    const val = localStorage.getItem("tkn");
    if (val != null) {
      setToken(val);
      // setUserData(jwtDecode(val));
    }
  }, []);

  //function from library jwt-decode
  // jwtDecode()
  // function getUserData(){
  // const UserData= jwtDecode(localStorage.getItem('tkn'))
  // console.log( "UserData" , UserData );
  // setUserData(userData)
  // }

  
  return (
    // value is property b7t feh el data elle b5lha shared
    <>
      <authContext.Provider value={{myToken: token, setToken }}>
        {children}
      </authContext.Provider>
    </>
  );
}
