import Header from './components/Header'
import Footer from './components/Footer'
import Post from './components/Post'
import Profile from './components/Profile'
import AsideDesktop from './components/AsideDesktop'
import NotificationsView from './components/NotificationsView'
import DetalleUsuario from './components/DetallesUsuario'
import Settings from './components/Settings'
import MakePublication from './components/MakePublication'
import Login from './components/authComponents/login'
import SignUp from './components/authComponents/signup'
import Validation from './components/authComponents/validation'
import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './assets/auth/AuthProvider'
import { API_URL } from './assets/auth/constants'


function App() {
  //Variable que almacena el valor de la pantalla en booleano
  const [isDesktop, setIsDesktop] = useState(window.innerWidth < 835);

  //Variable que tratará de cambiar el aspecto de la página
  const [darkMode, setDarkMode] = useState(false);

  //Arreglo que contendrá a todos los posts iterados
  const [posts,setPosts]=useState([]);

  //Evento que escucha cada vez que la pantalla cambia de tamaño
  window.addEventListener('resize', () => {
    setIsDesktop(window.innerWidth < 835);
    console.log(user);
  });

  useEffect(()=>{
    fetchPosts();
  },[]);

  const fetchPosts=async()=>{
    try{
      const response=await fetch(`${API_URL}/getAllPosts`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      });

      const result=await response.json();

      if(response.ok){
        setPosts(result.body.posts);
      }
      else{
        console.error("Error al obtener publicaciones: ".error);
      }

    }
    catch(error){
      console.error("Error al contactar a la API");
    }
  }

  //variable que controla la clase de modo obscuro
  const dark = darkMode ? 'dark' : ''

  //Función que cambia de estado a la variable que determina el modo obscuro
  //También aplica la clase al body para no dejar huecos en otro color
  function darkBody() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark');
    }
    else {
      document.body.classList.remove('dark');
    }
  }

  return (
    <>
      <AuthProvider>

        <BrowserRouter>
          <Routes>

            <Route path='/' element={
              <div id="login" className={dark}>
                <Login />
              </div>
            } />

            <Route path='/signup' element={
              <div id='signup' className={dark}>
                <SignUp />
              </div>
            } />

            <Route element={<Validation />}>

              <Route path='/home' element={
                <div>
                  <div id="header" className={dark}>
                    {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody}/>) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody}/>)}
                  </div>

                  <div id='post' className={dark}>
                    {posts.map((post,index)=>(
                      <Post key={index} postId={post.id} name={`${post.name} ${post.lastName}`} date={post.date} content={post.body} source={post.profile_picture}/>
                    ))}
                  </div>

                  <div id='footer'>
                    {isDesktop ? (<Footer />) : ''}
                  </div>
                </div>
              } />

              <Route path='/perfil' element={
                <div>
                  <div id="header" className={dark}>
                    {!isDesktop ? (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : ''}
                  </div>

                  <div id='profile' className={dark}>
                    <Profile/>
                  </div>

                  <div id='footer'>
                    {isDesktop ? (<Footer />) : ''}
                  </div>
                </div>
              } />

              <Route path='/notificaciones' element={
                <div>
                  <div id="header" className={dark}>
                    {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
                  </div>

                  <div id='notification' className={dark}>
                    <NotificationsView />
                  </div>

                  <div id='footer'>
                    {isDesktop ? (<Footer />) : ''}
                  </div>
                </div>
              } />

              <Route path='/configuracion' element={
                <div>
                  <div id="header" className={dark}>
                    {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
                  </div>

                  <div id='settings' className={dark}>
                    <Settings />
                  </div>

                  <div id='footer'>
                    {isDesktop ? (<Footer />) : ''}
                  </div>
                </div>
              } />

              <Route path='/detalles-usuario' element={
                <div>
                  <div id="header" className={dark}>
                    {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
                  </div>

                  <div id='detalleUser' className={dark}>
                    <DetalleUsuario dark={darkMode} />
                  </div>

                  <div id='footer'>
                    {isDesktop ? (<Footer />) : ''}
                  </div>
                </div>
              }/>

              <Route path='/crear-publicacion'element={
                <div>
                    <div id="header" className={dark}>
                      {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
                    </div>

                    <div id='makePublication'>
                      <MakePublication dark={dark}/>
                    </div>

                    <div id='footer'>
                      {isDesktop ? (<Footer />) : ''}
                    </div>
                </div>
              }/>

            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
