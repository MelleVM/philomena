import React from "react"

function Step2(props) {
    const display = props.enabled ? {display: "block"} : {display: "none"}

    return (
        <div style={display} className="group two-line">
            <h3>Preferences</h3>
            <select name="day" value={props.preferences.day} onChange={props.handleChange}>
                <option value="" hidden disabled="disabled">Select a day...</option>
                <option value={0}>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
            </select>
            <select name="timeOfDay" value={props.preferences.timeOfDay} onChange={props.handleChange}>
                <option value="" hidden disabled="disabled">Select a time of day...</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option disabled={props.preferences.day !== "4"} value="evening">Evening</option>
            </select>
            {/* <Button fontSize="20px" opacity={props.inputsFilled.step2 ? 1 : 0.5} clickEvent={props.nextPage} isDisabled={props.inputsFilled.step2 ? false : true} width="unset" padding="12px 50px" background={props.inputsFilled.step2 ? "#3840B1" : "gray"} color="white" borderRadius={0} value="Next" /> */}
        </div>
    )
}

export default Step2