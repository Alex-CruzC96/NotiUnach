import { useContext, createContext,useState,useEffect } from "react";

const AuthContext=createContext({
    isAuth:false,
    setIsAuth:()=>{}
});

export function AuthProvider({children}){
    const[isAuth,setIsAuth]=useState(false);

    return(
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);