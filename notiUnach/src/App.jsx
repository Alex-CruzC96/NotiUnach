import Header from './components/Header'
import Footer from './components/Footer'
import Post from './components/Post'
import AsideDesktop from './components/AsideDesktop'
import './App.css'
import { useState } from 'react'

function App() {

  //Variable que almacena el valor de la pantalla en booleano
  const [isDesktop,setIsDesktop]=useState(window.innerWidth < 835);

  //Evento que escucha cada vez que la pantalla cambia de tamaño
  window.addEventListener('resize',()=>{
    setIsDesktop(window.innerWidth < 835);
  });

  return (
    <>
      <div id="header">
        { isDesktop ? (<Header/>) : (<AsideDesktop/>)}
      </div>
      <div id='post'>
        <Post user={'github/mdo'} name={'User_00'} date={'14-09-2024'} content={'Vendo libro usado, como nuevo. $200 pesos a tratar.'}/>
        <Post user={'duckduckgo/gummibeer.dev'} name={'User_01'} date={'13-09-2024'} content={'Busco libro de inglés para un nivel 2.'}/>
        <Post user={'google/netflix.com'} name={'User_02'} date={'13-09-2024'} content={'Soy estudiante de arquitectura y estoy vendiendo un set de reglas'}/>
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
      <div id='footer'>
        { isDesktop ? (<Footer/>) : '' }
      </div>
    </>
  )
}

export default App
