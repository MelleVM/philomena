import React from "react"

function SectionTop(props) {

    return (
        <div style={props.style} className="section-top">
            <div>
                {props.children}
            </div>
        </div>
    )
}

SectionTop.defaultProps = {
    headerProps: {Height: "200px"}
}

export default SectionTop