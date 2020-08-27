import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {Context} from "../../Context";
import Axios from "axios";
import ErrorNotice from "../../misc/ErrorNotice";
import Button from "../Button"
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData, setHeaderProps, notify, settings } = useContext(Context);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        `${settings.API_URL}/users/login`,
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
      notify("success", "Successfully logged in!")
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
          <h3>Login</h3>
        </div>
      </div>
      <div className="auth-section-2">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form onSubmit={submit}>
          <div className="group"> 
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group"> 
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button borderRadius={0} value="Login" background="#3840B1" />
          <Link to="/register" className="link">No Account Yet?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login