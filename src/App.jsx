import React, {useEffect, useState} from "react";
import Navbar from "./components/Navbar/Navbar";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer";
import "./App.css"
import Formulario from "./components/Form/Form";
import debounce from 'lodash/debounce';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [buscado, setBuscado] = useState(false);

  function handleSearchTermChange(term) {
    setSearchTerm(term);
    setBuscado(true);
    console.log(searchTerm);
  }

  const debounceSearchTerm = debounce(handleSearchTermChange, 5000);

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
      <Navbar onSearchTermChange={debounce(handleSearchTermChange, 5000)}/>
      <ImagesContainer searchTerm={searchTerm} buscado={buscado}/>
    </div>
  )
}

export default App;