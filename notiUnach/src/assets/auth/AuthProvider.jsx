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

    //Función para retornar la foto de perfil en uso
    async function getUserProfilePicture(userId){
        try{
            //Hace la consulta y espera una respuesta
            const response=await fetch(`${API_URL}/userPicture/${userId}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${getAccessToken()}`
                }
            });

            /**
             * Si la consulta devuelve un código 200
             * significa que la consulta fue un éxito y que
             * la respuesta contiene la url de la imagen del
             * usuario.
             * De lo contrario puede significar que el usuario
             * aun no tiene foto de perfil o que hubo un error
             */
            if(response.ok){
                const data=await response.json();
                return data.body.profilePicture;
            }
            else{
                const errorData=await response.json();
                return {
                    success:false,
                    error:errorData
                };
            }

        }catch(error){
            return {
                success:false,
                error
            }
        }
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

                //Obtención y almacenamiento de la foto de perfil
                const profilePicture=await getUserProfilePicture(data.body.user.id);
                setUser(prevUser => ({
                    ...prevUser,
                    profilePicture
                }));
                localStorage.setItem('user',JSON.stringify({
                    ...data.body.user,
                    profilePicture
                }));

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