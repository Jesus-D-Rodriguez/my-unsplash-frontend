import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer";
import "./App.css"
import Formulario from "./components/Form/Form";

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [buscado, setBuscado] = useState(false);

  function handleSearchTermChange(term) {
    setSearchTerm(term);
    setBuscado(true);
    console.log(searchTerm);
  }

  function handleBuscado() {

  }

  /*{(typeof backendData.users === "undefined") ? (
    <p>Loading...</p>
  ): (
    backendData.users.map((user, i) => (
      <p key={i}>{user}</p>
    ))
  )}*/



  /*const [images, setImages] = useState([]); 
  useEffect(async ()=>{
    await fetch("http://localhost:5000/").then(
      response => response.json()
    ).then(
      data=> {
        setImages(data);
      }
    );
    console.log(images);
  }, [])*/

  return (
    <div className="container">
      <Navbar onSearchTermChange={handleSearchTermChange}/>
      <ImagesContainer searchTerm={searchTerm} buscado={buscado}/>
    </div>
  )
}

export default App;