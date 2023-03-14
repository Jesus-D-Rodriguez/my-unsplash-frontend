import React, {useState} from "react";
import axios from 'axios';
import "./Form.css"

function Formulario(props) {
    const [labelValue, setLabelValue] = useState("");
    const [urlValue, setUrlValue] = useState("");

    const handleLabelValue = (event) =>{
        setLabelValue(event.target.value);
        console.log(labelValue);
    }

    const handleUrlValue = (event) =>{
        setUrlValue(event.target.value);
        console.log(urlValue);

    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const response = await axios.post('https://my-unsplash-api-cr1h.onrender.com/post', {
                label: labelValue,
                url: urlValue
            })

        } catch (error) {
            console.log(error);
        }

        setUrlValue("");
        setLabelValue("");
        props.onClose();
        window.location.reload();
    }

    return (
        <div className="formulario">
            <div id="form-container">
                <form onSubmit={handleSubmit} style={{height:'100%'}}>
                    <div id="form-title">Add a new photo</div>
                    <div className="form-input-text">
                        <label>
                            <div style={{textAlign:'left'}}>Label</div>
                            <input type="text" value={labelValue} onChange={handleLabelValue} placeholder='Suspendisse elit massa'></input>
                        </label>
                    </div>
                    <div className="form-input-text">
                        <label>
                            <div style={{ textAlign:'left' } }>Photo URL</div>
                            <input type="text" value={urlValue} onChange={handleUrlValue} placeholder='https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r...'></input>
                        </label>
                    </div>
                    <div style={{display:'flex', justifyContent:'right'}}>
                        <button type="button" onClick={props.onClose} style={{background:'white', border:'none', outline:'none', color:'#BDBDBD'}}>Cancelar</button>
                        <button type="submit" style={{background:'#3DB46D', color:'white'}}>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Formulario;