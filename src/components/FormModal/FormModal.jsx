import "./FormModal.css"
import Form from "../Form/Form"

function FormModal (props) {
    return (
    <div className="modal">
        <div className="modal-content">
            {props.children}
        </div>
        <div className="modal-overlay" onClick={props.onClose}></div>
    </div>)
}

export default FormModal;