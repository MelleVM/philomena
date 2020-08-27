import {useEffect, useContext} from "react"
import { useLocation} from "react-router-dom";
import {Context} from "../../../../Context"
import {useHistory} from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';

// gets the query information from the url
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function PaymentStatus() {
    const {notify, createAppointment} = useContext(Context)
    const history = useHistory()

    let query = useQuery();

    function checkPaymentStatus() {
        const queryStatus = query.get("redirect_status")
        const queryGet = (value) => query.get(value)  

        // checks if the query stripe sent us indicates if the payment
        // is successful or unsuccessful
        if(queryStatus === "succeeded") {
            notify("success", "Payment Successful")
            createAppointment({timeFrom: queryGet("timeFrom"), timeTo: queryGet("timeTo"), date: queryGet("date"), fullDate: queryGet("fullDate"), fullDateEnd: queryGet("fullDateEnd"), productId: queryGet("productId"), employeeId: queryGet("employeeId"), userId: queryGet("userId")}, history)
        } else if(queryStatus === "failed") {
            notify("error", "Payment Failed")
            history.push('/appointments')
        } else if (!queryStatus) {
            notify("warning", "No payment found")
            history.goBack()
        } else {
            notify("warning", "Payment Status unknown") 
            history.push('/appointments')
        }

    }

    useEffect(() => {
        checkPaymentStatus()
    }, [])




    return null
}   

export default PaymentStatus




