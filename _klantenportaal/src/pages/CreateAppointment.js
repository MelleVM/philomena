import React, {useState, useContext, useEffect} from "react"
import {Context} from "../Context"
import {useHistory} from "react-router-dom"
import CreateAppointmentForm from "../components/CreateAppointmentForm"
import Button from "../components/Button"

function CreateAppointment(props) {
    const [preferences, setPreferences] = useState({day: "", timeOfDay: ""})
    const [spot, setSpot] = useState({timeFrom: "", timeTo: "", date: "", productId: ""})
    const [inputsFilled, setInputsFilled] = useState({step1: false, step2: false, step3: false})
    
    const [service, setService] = useState([])
    const [product, setProduct] = useState({id: null, length: 30})

    const {createAppointment, headerProps, setHeaderProps, userData} = useContext(Context)
    const history = useHistory()

    function handleChange(event) {
        const {value, name} = event.target


        if (name === "day") {
            setPreferences(prevPreferences => ({...prevPreferences, day: value}))
        } else if (name === "timeOfDay") {
            setPreferences(prevPreferences => ({...prevPreferences, timeOfDay: value}))
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        createAppointment(spot, history) 
    }

    useEffect(() => {
        setHeaderProps({
            "height": "82px",
            "borderRadius": "0"
        })
        props.setActivePage("createAppointments")
    }, [])

    useEffect(() => {
        const { timeFrom, timeTo, date } = spot
        const { day, timeOfDay } = preferences
        if (timeFrom !== "" && timeTo !== "" && date !== "") {
            setInputsFilled(prevInputsFilled => ({
                ...prevInputsFilled,
                step3: true
            }))
        }
        if (day !== "" && timeOfDay !== "") {
            setInputsFilled(prevInputsFilled => ({
                ...prevInputsFilled,
                step2: true
            }))
        }
        if (service !== "" && product.id !== null) {
            setInputsFilled(prevInputsFilled => ({
                ...prevInputsFilled,
                step1: true
            }))
        }
    }, [preferences, spot, service, product])

    return (
        <>
            <div style={{"height": `calc(100% - ${headerProps.height})`}} className={userData.user ? "need-auth-container" : "need-auth-container active"}>
                <div className="need-auth-wrapper">
                    <h4>In order to make an appointent</h4>
                    <Button
                        clickEvent={() => history.push("/register")}
                        background="#3840B1"
                        color="white"
                        borderRadius={0}
                        value="Sign up"
                        fontSize = "22px"
                    />
                    <h5>Or</h5>
                    <Button
                        clickEvent={() => history.push("/login")}
                        background="#3840B1"
                        color="white"
                        borderRadius={0}
                        value="Sign in"
                        fontSize="22px"
                    />
                </div>
            </div>
            <CreateAppointmentForm product={product} setProduct={setProduct} service={service} setService={setService} spot={spot} setSpot={setSpot} handleSubmit={handleSubmit} preferences={preferences} handleChange={handleChange} inputsFilled={inputsFilled} setInputsFilled={setInputsFilled} />
        </>
    )
}

export default CreateAppointment