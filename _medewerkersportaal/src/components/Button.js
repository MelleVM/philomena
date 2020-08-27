import React from "react"

function Button(props) {
    const styles = {
        "background": props.background,
        "color": props.color,
        "borderRadius": props.borderRadius,
        "width": props.width,
        "padding": props.padding,
        "border": props.border,
        "fontSize": props.fontSize,
        "opacity": props.opacity
    }

    return(
        <button onClick={props.clickEvent} disabled={props.isDisabled} style={styles}
        className="btn-reusable"> {props.value} </button>
    )
}

Button.defaultProps = {
    background: "crimson",
    color: "white",
    borderRadius: 5,
    isDisabled: false,
    width: "100%",
    padding: "12px 24px",
    clickEvent: null,
    border: "0px",
    fontSize: "14px",
    opacity: "1"
}

export default Button