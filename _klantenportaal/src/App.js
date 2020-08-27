import React, {useState, useEffect, useContext} from "react"
import { Switch, Route, Redirect} from "react-router-dom";
import './styles/App.scss';
import Navigation from "./components/Navigation"
import CreateAppointment from "./pages/CreateAppointment"
import Appointments from "./pages/Appointments"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Axios from "axios";
import {Context} from "./Context";
import PaymentStatus from "./components/form/appointment/payment/PaymentStatus"

import {
  ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 
    const [sidebar, setSidebar] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [device, setDevice] = useState("phone")
    const [activePage, setActivePage] = useState("home")
    const { userData, setUserData, getEmployees, settings } = useContext(Context); 


    function toggleSidebar() {
      setSidebar(prevSidebar => !prevSidebar)
    }

    function toggleDropdown() {
      setDropdown(prevDropdown => !prevDropdown)
    }


    useEffect(() => {
      // checking if the user is logged in by using an async function
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await Axios.post(
          `${settings.API_URL}/users/tokenIsValid`,
          null, {
            headers: {
              "x-auth-token": token
            }
          }
        );
        if (tokenRes.data) {
          const userRes = await Axios.get(`${settings.API_URL}/users/`, {
            headers: {
              "x-auth-token": token
            },
          });
          setUserData({
            token,
            user: userRes.data,
          });
        }
      };

      checkLoggedIn();
      getEmployees();
    }, []);



    return ( 
      <>
        {/* This will display all the on-screen notifications */}
        <ToastContainer />
        <div className="switch-device">
          <i className={`ri-smartphone-${device === "phone" ? "fill" : "line" }`} onClick={() => setDevice("phone")} />
          <i className={`ri-tablet-${device === "tablet" ? "fill" : "line" }`} onClick={() => setDevice("tablet")} /> 
        </div>
        <div className={device === "phone" ? "mobile-phone" : "tablet"}>
          <div
            className="wrapper-overlay"
            onClick={() => setDropdown(false) + setSidebar(false)}
            style={sidebar || dropdown ? { display: "block" } : { display: "none" }}
          />
            

          {/* using react-router-dom to make a routing system for the different pages */}
            <Switch>
              <Route exact path="/">
                <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                <Home setActivePage={setActivePage} />
              </Route>
              <Route path="/create/appointment">
                <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                <CreateAppointment setActivePage={setActivePage} />
              </Route>
              <Route path="/appointments"> 
                <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                <Appointments setActivePage={setActivePage} />
              </Route>
              <Route path="/settings"> 
                <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                <Settings setActivePage={setActivePage} />
              </Route> 
              <Route path="/login">
                {!userData.user ? (
                  <>
                    <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                    <Login />
                  </>
                ) : <Redirect to="/" />}
              </Route>
              <Route path="/register" >
                {!userData.user ? (
                  <>
                    <Navigation activePage={activePage} dropdown={{ toggle: toggleDropdown, view: dropdown }} sidebar={{ toggle: toggleSidebar, view: sidebar }} />
                    <Register />
                  </>
                ) : <Redirect to="/" />}
              </Route>
              <Route path="/payment/status">
                <PaymentStatus />
              </Route>
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
        </div>
      </>
    );
}

export default App 