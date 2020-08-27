import React from "react"

function Modal(props) { 

    return (
        <div className="form-modal-page-wrapper">
            <div className="close-form-modal-wrapper" onClick={props.close}></div>
            <div className="form-modal">
                <form onSubmit={props.submitEvent}>
                    {props.children}
                
                    <div className="bottom">
                        <button disabled={props.disabled} type="submit">SAVE</button>
                        <span onClick={props.close}>CANCEL</span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal