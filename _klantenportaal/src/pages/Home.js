import React, {useState, useEffect, useContext} from "react"
import {Context} from "../Context"
import Moment from "react-moment";
import moment from "moment";
import AppointmentList from "../components/AppointmentList"

function Home(props) {
    const [liveTime, setLiveTime] = useState()
    const {getAppointments, setHeaderProps} = useContext(Context)    

    useEffect(() => {
        getAppointments(props)
        setHeaderProps({
            "height": "225px",
            "borderRadius": "0 0 20px 20px",
            "children": (
                <>
                    <img alt="logo" src="/images/logo.svg" width="80%" />
                    <h3>Philomena</h3>
                </>
            )
        })
        props.setActivePage("home")

        // Making sure the timer updates live and stays true to the real time
        const timeUpdater = () => setInterval(() => {
            setLiveTime(moment())
        }, 1000)
        timeUpdater()

        // Cleaning up the useEffect hook
        return clearInterval(timeUpdater)
    }, [])

    return (
        <>
            <div className="homepage-section-1">
                <div className="current-datetime">
                    <h2><Moment date={liveTime} format="dddd" /></h2>
                    <h4><Moment date={liveTime} format="MMMM Do, YYYY" /></h4>
                    <h3><Moment date={liveTime} format="HH:mm:ss" /></h3>
                </div>
            </div>
            <div className="homepage-section-2">
                <ul className="appointments-container">
                    <AppointmentList />
                </ul>
            </div>
        </>
    )
}

export default Home