import "./Navbar.css";
import logo from "../../assets/my_unsplash_logo.svg"
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Formulario from "../Form/Form";
import FormModal from "../FormModal/FormModal";

const Navbar = (props)=>{
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [haBuscado, setHaBuscado] = useState(false);

    function mostrarFormulario() {
      setFormularioVisible(true);
    }
  
    function cerrarFormulario() {
      setFormularioVisible(false);
    }

    function handleSearchTerm(e) {
        const term = e.target.value;
        setHaBuscado(true);
        setSearchTerm(term);
        props.onSearchTermChange(term);
        console.log(term);
    }

    return (
    <div className="nav-bar">
        <div id="first-nav-bar">
            <img src={logo} alt="" />
            <div id="search-div">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                <input type="text" id="search" placeholder="Search by name" value={searchTerm} onChange={handleSearchTerm}></input>
            </div>
        </div>
        <div id="second-nav-bar">
            <button id="add" onClick={mostrarFormulario}>Add a photo</button>
            {formularioVisible && (
                <FormModal onClose={cerrarFormulario}>
                    <Formulario onClose={cerrarFormulario}></Formulario>
                </FormModal>
    
            )}
        </div>
    </div>)
}

export default Navbar;