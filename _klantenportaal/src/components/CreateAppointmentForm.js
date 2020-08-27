import React, {useState, useContext} from "react"
import Step1 from "./form/appointment/Step1"
import Step2 from "./form/appointment/Step2"
import Step3 from "./form/appointment/Step3"
import {Context} from "../Context"
import CheckoutForm from "./form/appointment/payment/CheckoutForm";


function CreateAppointmentForm(props) {
    const [enabledStep, setEnabledStep] = useState(1)
    const {
        appointments,
        headerProps
    } = useContext(Context)

    console.log(appointments)

    function nextPage(event) {
        event.preventDefault()
        setEnabledStep(prev => prev + 1)
    }


    function prevPage(event) {
        event.preventDefault()
        setEnabledStep(prev => prev - 1)
    }


    function timeOfDay() {
        switch (props.preferences.timeOfDay) {
            case ("morning"): 
                return {
                    startHour: "10",
                    startMinute: "00",
                    endHour: "12",
                    endMinute: "00"
                }
            
                case ("afternoon"): 
                    return {
                        startHour: "12",
                        startMinute: "00",
                        endHour: "18",
                        endMinute: "00"
                    }
                
                case ("evening"):  
                    if(props.preferences.day === "4") {
                        return {
                            startHour: "19",
                            startMinute: "00",
                            endHour: "21",
                            endMinute: "00"
                        }
                    }
                break
                default:
                    return
        }
    }

    function nextButton() {
        if(enabledStep === 1 && !props.inputsFilled.step1) {
            return true
        } else if(enabledStep === 2 && !props.inputsFilled.step2) {
            return true
        } else if (enabledStep === 3 && !props.inputsFilled.step3) {
            return true
        }
    }

    return (
        <>
            <div className="forms" style={{"min-height": `calc(100% - ${headerProps.height})`}}>
                <form style={{"height": "100%"}} className={enabledStep === 4 ? "form-1 disabled" : "form-1"} onSubmit={props.handleSubmit}>
                    <Step1 nextPage={nextPage} service={props.service} setService={props.setService} product={props.product} setProduct={props.setProduct} spot={props.spot} setSpot={props.setSpot} enabled={enabledStep === 1} stepNumber={1} setEnabledStep={setEnabledStep} handleSubmit={props.handleSubmit} preferences={props.preferences} handleChange={props.handleChange} inputsFilled={props.inputsFilled} setInputsFilled={props.setInputsFilled} />
                    <Step2 nextPage={nextPage} enabled={enabledStep === 2} stepNumber={2} setEnabledStep={setEnabledStep} handleSubmit={props.handleSubmit} preferences={props.preferences} handleChange={props.handleChange} inputsFilled={props.inputsFilled} setInputsFilled={props.setInputsFilled} />
                    {enabledStep === 3 && <Step3 nextPage={nextPage} service={props.service} setService={props.setService} product={props.product} setProduct={props.setProduct} enabled={enabledStep === 3} appointments={appointments} timeOfDay={timeOfDay} spot={props.spot} setSpot={props.setSpot} stepNumber={3} setEnabledStep={setEnabledStep} handleSubmit={props.handleSubmit} preferences={props.preferences} handleChange={props.handleChange} inputsFilled={props.inputsFilled} setInputsFilled={props.setInputsFilled} />}
                </form>

                {enabledStep === 4 && <CheckoutForm details={props.spot} prevPage={prevPage} />}
            </div>
                <ul className="form-navigator">
                    <button disabled={enabledStep === 1} onClick={prevPage} className="prev">Prev</button>
                    <li className={enabledStep === 1 ? "active" : ""} onClick={() => setEnabledStep(1)}>1</li>
                    <li className={enabledStep === 2 ? "active" : !props.inputsFilled.step1 && "disabled"} onClick={() => props.inputsFilled.step1 && setEnabledStep(2)}>2</li>
                    <li className={enabledStep === 3 ? "active" : !props.inputsFilled.step2 && "disabled"} onClick={() => props.inputsFilled.step2 && setEnabledStep(3)}>3</li>
                    <button disabled={nextButton()} onClick={nextPage} className="next">Next</button>
                </ul>
        </>
    )
}

export default CreateAppointmentForm