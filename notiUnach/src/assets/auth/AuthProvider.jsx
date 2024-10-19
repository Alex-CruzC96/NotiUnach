import { useContext, createContext,useState,useEffect } from "react";
import { API_URL } from "../auth/constants";

const AuthContext=createContext({
    isAuth:false,
    getAccessToken:()=>'',
    setIsAuth:()=>{},
    handleLogin:()=>{},
    handleLogout:()=>{}
});

export function AuthProvider({children}){
    const[isAuth,setIsAuth]=useState(false);
    const[accessToken,setAccessToken]=useState(localStorage.getItem('accessToken') || '');
    const[refreshToken,setRefreshToken]=useState(localStorage.getItem('refreshToken') || '');

    useEffect(()=>{
        //Si el token existe entonces nos logea 
        if(accessToken){
            setIsAuth(true);
        }
    },[accessToken]);


    function getAccessToken(){
        return accessToken;
    }

    async function handleLogin(mail, password){
        try{
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mail,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                setIsAuth(true);
                return { success: true };
              } else {
                const errorData = await response.json();
                return { success: false, error: errorData };
              }
        }
        catch(error){
            return { success: false, error };
        }
    }

    function handleLogout(){
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setAccessToken('');
        setRefreshToken('');
        setIsAuth(false);
    }

    return(
        <AuthContext.Provider value={{ isAuth, setIsAuth, getAccessToken, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);