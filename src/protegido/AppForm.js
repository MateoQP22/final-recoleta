import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../conexion/firebase"


const AppForm = (props) => {
  const handleStatusChange = (e) =>{
    const {name,value} = e.target
    setObjeto({...objeto,[name]:value});
    console.log({name , value});
  }

  const camposRegistro = { nombre:"", edad:"", genero:""};
  const [objeto, setObjeto] = useState(camposRegistro);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(props.idActual == ""){
        if(validarForm()){
          addDoc(collection(db, 'persona'),objeto);
          alert("Se registro con exito...");
        }else{
          console.log("No se Guardo...")
        }
      }else{
        alert("No se pudo guardar")
      }
    } catch (error) {
      console.log("Error en CREAR o ACTUALIZAR", error);
    }
  }

  const validarForm = () => {
    if (objeto.nombre === "" || /^\s+$/.test(objeto.nombre)){
      alert("Esribe tu nombre...")
      return false;
    }
    return true;
  };

  return (
    <div style={{background:"orange", padding:"10px"}}>
      <form onSubmit={handleSubmit}>
        <button>Cerrar Aplicación</button>
        <h2>Registrar (AppForm.js)</h2>
        <input onChange={handleStatusChange} name='nombre' type='text' placeholder='Nombre'/><br/>
        <input onChange={handleStatusChange} name='edad' type='text' placeholder='Edad'/><br/>
        <select onChange={handleStatusChange} name='genero'>
          <option value="">Seleccione una opción</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <br/>
        <button >
          {props.idActual=="" ? "Guardar" : "Actualizar"}
        </button>
      </form>
    </div>
  )
}

export default AppForm