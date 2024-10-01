import { useState, useEffect } from "react";


const UseFetch=(url) => {
    //intento de comunicacion API
    const[consulta,setConsulta]=useState([]);

    useEffect(()=>{
      fetch(url)
      .then((response) => response.json())
      .then((datos) => setConsulta(datos));
    },[]);

    return {consulta}
}

export default UseFetch