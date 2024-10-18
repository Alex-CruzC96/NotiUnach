import { useContext, createContext,useState,useEffect } from "react";

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

    async function handleLogin(email, password){
        try{
            const response=await fetch(`${API_URL}/login`,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify({email, password}),
            });

            if(response.ok){
                //Almacena la respuesta del servidor cuando el login es exitoso
                const data= await response.json();
                //Almacena en local los tokens generados al iniciar sesión
                localStorage.setItem('accessToken',data.accessToken);
                localStorage.setItem('refreshToken',data.refreshToken);
                //Agrega los tokens a las variables
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);
                //Asigna el valor de true a la variable que controla el acceso en la app
                setIsAuth(true);
            }else{
                console.error('Error al iniciar sesión');
            }
        }
        catch(error){
            console.error('Error al iniciar sesión: '+error);
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