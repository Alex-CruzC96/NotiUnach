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
    const[user,setUser]=useState(null);

    useEffect(()=>{
        //Si el token existe entonces nos logea 
        if(accessToken){
            setIsAuth(true);

            const storedUser=localStorage.getItem('user');
            if(storedUser){
                setUser(JSON.parse(storedUser));
            }
        }
    },[accessToken]);


    function getAccessToken(){
        return accessToken;
    }

    async function handleLogin(mail, password){
        try{
            //Se dirige a la API para intentar iniciar sesión
            //Utiliza el correo y contraseña que se le pasa
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

            //Si la api responde con un estado 200
            if (response.ok) {
                //Entonces guardamos la respuesta en data
                /**
                 * data={
                 *  body:{
                 *      accessToken:"",
                 *      refreshToken:"",
                 *      user:{
                 *          id:"",
                 *          lastName:"",
                 *          name:""
                 *      }
                 *  },
                 *  statusCode:""
                 * }
                 */
                const data = await response.json();
                
                //Teniendo los datos guardados almacenamos los tokens en localhost
                localStorage.setItem('accessToken', data.body.accessToken);
                localStorage.setItem('refreshToken', data.body.refreshToken);
                localStorage.setItem('user',JSON.stringify(data.body.user));

                //Y cambiamos el estado de las dos variables
                setAccessToken(data.accessToken);
                setRefreshToken(data.refreshToken);

                //Le damos valor a user
                setUser(data.body.user);

                //La autenticación fue un éxito
                setIsAuth(true);
                //Retorna success 
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
        localStorage.removeItem('user');
        setAccessToken('');
        setRefreshToken('');
        setUser(null);
        setIsAuth(false);
    }

    return(
        <AuthContext.Provider value={{ isAuth, user, setIsAuth, getAccessToken, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);