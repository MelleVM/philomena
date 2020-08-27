import React, {useState, useEffect, useContext} from "react"
import {Context} from "../../../Context"
import Button from "../../Button"
import moment from "moment";
import Moment from "react-moment";
import "moment-timezone";

let id = 0;
const getKey = () => id++;


function Step3(props) {
    const day = parseInt(props.preferences.day)
    const [slots, setSlots] = useState([])
    const [weekNr, setWeekNr] = useState(1)
    const [dateStamp, setDateStamp] = useState(moment().startOf("isoWeek").add(day + 7, "day").set({
          "hour": props.timeOfDay().startHour,
          "minute": props.timeOfDay().startMinute
        }))
    const display = props.enabled ? {display: "block"} : {display: "none"}      
    const { userData, employees, exceptions } = useContext(Context);

    function isTaken(time, date, fullDate, fullDateEnd) {
      let check = props.appointments.some(appointment => appointment.timeFrom === time && appointment.date === date)
      let message = "Spot taken"

      const employee = employees.find(employee => employee.status !== "sick" && employee.specialty === props.service && employee.workDayPart === props.preferences.timeOfDay)

      const allExceptions = exceptions.some(exception => moment(exception.dateFrom, ("DD-MM-YYYY HH:mm")) <= moment(fullDate) && moment(exception.dateTo, ("DD-MM-YYYY HH:mm")) >= moment(fullDateEnd))
      
      if(!check) {
        const lunchTimeFrom = moment().set({"hour": 12, "minute": 0}).format("HH:mm")
        const lunchTimeTo = moment().set({"hour": 13, "minute": 0}).format("HH:mm")
        const saturdayTimeFrom = moment().set({"hour": 10, "minute": 0}).format("HH:mm")
        const saturdayTimeTo = moment().set({"hour": 15, "minute": 0}).format("HH:mm")

        message = "Spot taken"

        if (allExceptions) {
          check = true
          message = "unknown"
        }
        
        if(!employee) {
          check = true
          message = "No employees present"
        }

        if (time >= lunchTimeFrom && time <= lunchTimeTo) {
          check = true
          message = "Employee lunchtime"
        } 
        
        if (props.preferences.day === "5") {
          if (time <= saturdayTimeFrom || time >= saturdayTimeTo) {
            check = true
            message = "Location closed"
          }
        }

      }

      return {check, message}
    }

    const updatedArr = moment({
      ...dateStamp
    })

    const endDate = moment({...dateStamp}).set({
      "hour": props.timeOfDay().endHour,
      "minute": props.timeOfDay().endMinute
    })

    const employee = employees.find(employee => employee.status !== "sick" && employee.specialty === props.service && employee.workDayPart === props.preferences.timeOfDay)

    useEffect(() => {
        if(endDate > dateStamp) {
          setDateStamp(updatedArr.add(parseInt(props.product.length), "minute"))
          const isDisabled = isTaken(dateStamp.format("HH:mm"), dateStamp.format("DD-MM-YYYY"), dateStamp, updatedArr)

          setSlots(prevSlots => [...prevSlots, {
            timeFrom: dateStamp.format("HH:mm"),
            timeTo: updatedArr.format("HH:mm"),
            date: dateStamp.format("DD-MM-YYYY"),
            fullDate: dateStamp,
            fullDateEnd: updatedArr,
            weekNr: weekNr,
            disabled: isDisabled.check,
            id: getKey(),
            productId: props.product.id,
            EmployeeId: employee && employee._id,
            userId: userData.user.id && userData.user.id,
            spotTakenMessage: isDisabled.check && isDisabled.message
          }])
          
        } else if(weekNr >= 1 && weekNr < 4) {
          setWeekNr(prevWeekNr => prevWeekNr + 1)

          setDateStamp(updatedArr.set({
            "hour": props.timeOfDay().startHour,
            "minute": props.timeOfDay().startMinute
          }).add(7, "day"))

        }
    }, [dateStamp, weekNr])



    const allSlots = slots.map(slot => (
        <div key={slot.id} className={slot.disabled ? "slot disabled tooltip" : "slot"}>
            
            {slot.disabled && <div class="top">
                <h3>{slot.spotTakenMessage}</h3>
                <i></i>
            </div>}
          <div className={props.spot.id === slot.id ? "wrapper active" : "wrapper"}>
            <label>
              <input disabled={slot.disabled} type="radio" name="slot" onChange={() => !slot.disabled && props.setSpot(prev => ({...prev, id: slot.id, timeFrom: slot.timeFrom, timeTo: slot.timeTo, date: slot.date, fullDate: slot.fullDate, fullDateEnd: slot.fullDateEnd, productId: slot.productId, employeeId: slot.employeeId, userId: slot.userId}))} />
                <Moment date={slot.date} parse="DD-MM-YYYY" format="DD-MM" /> <br />
                <span>{slot.timeFrom}</span>
            </label>
          </div>
        </div>
    ))

    return (
      <div style={display} className="group two-line step-3">
        <h3>Available Spots</h3>
        <div className="slots">

          {allSlots}
        </div>

        <div className="submit-form-container">
          <Button
            fontSize = "20px"
            isDisabled={props.inputsFilled.step3 ? false : true}
            background={props.inputsFilled.step3 ? "crimson" : "gray"}
            color="white"
            padding="20px"
            borderRadius={0}
            value={<><i className="fab fa-ideal" /> Confirm Appointment</>}
            opacity={props.inputsFilled.step3 ? 1 : 0.5}
            clickEvent={props.nextPage}
          />
          <p>One time fee of €5.00 will apply!</p>
        </div>
      </div>
    );
}

export default Step3