import React from "react"

function Modal(props) {

    return (
        <div className="info-modal-page-wrapper">
            <div className="close-info-modal-wrapper" onClick={props.close}></div>
            <div onClick={() => console.log('ok')} className="info-modal">
                <div className="top">
                    Create User
                </div>
                <form onSubmit={props.submitEvent}>
                    {props.children}
                </form>
                <div onClick={props.close} className="bottom close-modal">CLOSE</div>
            </div>
        </div>
    )
}

export default Modal