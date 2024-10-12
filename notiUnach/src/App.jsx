import Header from './components/Header'
import Footer from './components/Footer'
import Post from './components/Post'
import Profile from './components/Profile'
import AsideDesktop from './components/AsideDesktop'
import NotificationsView from './components/NotificationsView'
import DetalleUsuario from './components/DetallesUsuario'
import Settings from './components/Settings'
import Login from './components/authComponents/login'
import SignUp from './components/authComponents/signup'
import Validation from './components/authComponents/validation'
import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


function App() {

  //Variable que almacena el valor de la pantalla en booleano
  const [isDesktop, setIsDesktop] = useState(window.innerWidth < 835);

  //Variable que tratará de cambiar el aspecto de la página
  const [darkMode, setDarkMode] = useState(false);

  //Evento que escucha cada vez que la pantalla cambia de tamaño
  window.addEventListener('resize', () => {
    setIsDesktop(window.innerWidth < 835);
  });

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
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <div id="login" className={dark}>
              <Login/>
            </div>
          }/>

          <Route path='/signup' element={
            <div id='signup'>
              <SignUp/>
            </div>
          }/>

          <Route element={<Validation/>}>
          
            <Route path='/perfil' element={
              <div>
                <div id="header" className={dark}>
                  {!isDesktop ? (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : ''}
                </div>
                <div id='profile' className={dark}>
                  <Profile user={'github/Alex-CruzC96'} name={'AlecRuz_c96'} />
                </div>
              </div>
            }/>
          </Route>

          {/* <Route path='/perfil' element={
            <div>
              <div id="header" className={dark}>
                {!isDesktop ? (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : ''}
              </div>
              <div id='profile' className={dark}>
                <Profile user={'github/Alex-CruzC96'} name={'AlecRuz_c96'} />
              </div>
            </div>
          } /> */}
          <Route path='/home' element={
            <div>
              <div id="header" className={dark}>
                {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
              </div>

              <div id='post' className={dark}>
                <Post user={'github/mdo'} name={'User_00'} date={'14-09-2024'} content={'Vendo libro usado, como nuevo. $200 pesos a tratar.'} />
                <Post user={'duckduckgo/gummibeer.dev'} name={'User_01'} date={'13-09-2024'} content={'Busco libro de inglés para un nivel 2.'} />
                <Post user={'google/netflix.com'} name={'User_02'} date={'13-09-2024'} content={'Soy estudiante de arquitectura y estoy vendiendo un set de reglas'} />
                <Post
                  user={'readcv/elenatorro'}
                  name={'User_03'}
                  date={'12-09-2024'}
                  content={'Mi primer post en la página, ¡Qué emoción!'}
                />
                <Post
                  user={'x/midudev'}
                  name={'miDudev'}
                  date={'09-08-2024'}
                  content={'Lorem ipsum dolor sit amet consectetur adipiscing elit, pulvinar mi nec interdum integer taciti. Ridiculus neque posuere nulla sociosqu, rhoncus ac fusce curabitur, conubia eget metus. Metus sagittis arcu molestie enim luctus in praesent auctor, faucibus pellentesque ligula penatibus conubia et tempor risus elementum, dui integer ac habitant blandit pretium tristique. Aliquet quam velit augue sem morbi mauris sagittis iaculis risus pharetra porttitor cras, vel et integer est nulla placerat odio vestibulum montes varius. Natoque faucibus tempus a lobortis conubia ad risus elementum phasellus, mattis scelerisque suscipit porttitor hendrerit arcu parturient interdum, odio montes inceptos ornare neque posuere tempor non. Neque suspendisse curae donec quam facilisi imperdiet eleifend torquent aliquam porta, a sagittis himenaeos vulputate ante bibendum cras ridiculus pulvinar, vitae augue habitant nascetur fringilla diam suscipit enim cum.'}
                />
              </div>
            </div>
          }>
          </Route>

          <Route path='/notificaciones' element={
            <div>
              <div id="header" className={dark}>
                {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
              </div>
              <div id='notification' className={dark}>
                <NotificationsView />
              </div>
            </div>
          }>
          </Route>

          <Route path='/configuracion' element={
            <div>
              <div id="header" className={dark}>
                {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
              </div>
              <div id='settings' className={dark}>
                <Settings />
              </div>
            </div>
          }></Route>

          <Route path='/detalles-usuario' element={
            <div>
              <div id="header" className={dark}>
                {isDesktop ? (<Header darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />) : (<AsideDesktop darkMode={darkMode} setDarkMode={darkBody} user={'github/Alex-CruzC96'} />)}
              </div>
              <div id='detalleUser' className={dark}>
                <DetalleUsuario dark={darkMode} />
              </div>
            </div>
          }></Route>

        </Routes>

        <div id='footer'>
          {isDesktop ? (<Footer />) : ''}
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
