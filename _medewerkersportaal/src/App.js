import React, {useState, useEffect, useContext} from "react"
import { Route, Redirect, Switch } from "react-router-dom";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import './styles/App.scss';

import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Employees from "./pages/Employees"
import Products from "./pages/Products"
import Exceptions from "./pages/Exceptions"
import Calendar from "./pages/Calendar"

import Axios from "axios";
import {Context} from "./Context";

function App() {
    const [device, setDevice] = useState("tablet")
    const { setUserData, settings } = useContext(Context);
    const [activePage, setActivePage] = useState("home")

    useEffect(() => {
      // Checking for login with an async function that 
      // gets the auth token from local storage
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
    });

    return ( 
      <>
        <div className="switch-device">
          <i className={`ri-smartphone-${device === "phone" ? "fill" : "line" }`} onClick={() => setDevice("phone")} />
          <i className={`ri-tablet-${device === "tablet" ? "fill" : "line" }`} onClick={() => setDevice("tablet")} /> 
        </div>

        <div className={device === "phone" ? "mobile-phone" : "tablet"}>
          <div className="admin-container">
              <Sidebar activePage={activePage} />
            <Switch>
              <Route exact path="/">
                  <Home schedule={{ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject}} setActivePage={setActivePage} />
              </Route>
              <Route exact path="/users">
                  <Users setActivePage={setActivePage} />
              </Route> 
              <Route exact path="/employees">
                  <Employees setActivePage={setActivePage} />
              </Route>
              <Route exact path="/products">
                  <Products setActivePage={setActivePage} />
              </Route>
              <Route exact path="/exceptions">
                  <Exceptions setActivePage={setActivePage} />
              </Route>
              <Route exact path="/calendar">
                  <Calendar schedule={{ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject}} setActivePage={setActivePage} />
              </Route>
              {/* Redirects users to home if they enter an undefined path */}
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
            </div>
        </div>
      </>
    );
}

export default App 