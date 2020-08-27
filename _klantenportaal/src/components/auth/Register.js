import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../Context";
import Axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";
import Button from "../Button"
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const {setUserData, setHeaderProps, notify, settings} = useContext(Context);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post(`${settings.API_URL}/users/register`, newUser);
      const loginRes = await Axios.post(`${settings.API_URL}/users/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/")
      notify("success", "Account created successfully!")
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

    useEffect(() => {
        setHeaderProps({
            "height": "80px",
            "borderRadius": "0"
        })
    }, [])

  return (
    <div className="auth-container">
      <div className="auth-section-1">
        <div>
          <img alt="logo" src="/images/logo.svg" width="100" /> 
          <h4>Proceed with your</h4>
          <h3>Registration</h3>
        </div>
      </div>
      <div className="auth-section-2">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <div className="group"> 
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              placeholder = "Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group"> 
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="group"> 
            <label htmlFor="register-password">Password (Verify)</label>
            <input
              id="verify-password"
              type="password"
              placeholder="Enter password again"
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>

          <div className="group"> 
            <label htmlFor="register-display-name">Display name</label>
            <input
              id="register-display-name"
              type="text"
              placeholder = "Enter display name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <Button borderRadius={0} value="Register" fontSize="16px" background="#3840B1" />
          <Link to="/login" className="link">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Register