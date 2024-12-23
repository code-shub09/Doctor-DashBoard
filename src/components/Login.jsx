import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { doctorContext } from "../store/contextX";
import loginImg from "../assets/loginimg.png";
import logo from "../assets/image.png";

function Login() {
  // State to manage form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, setAuthenticated } = useContext(doctorContext);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct the form data to be sent
    const formData = {
      email: email,
      password: password,
    };
    console.log(formData);
    
    try {
    
      
      const response = await axios.post(
        "https://healthmaster-4r73.onrender.com/api/v1/doctor/doctorlogin",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("diwali");

      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      // Handle any errors (e.g., show error messages)
      console.error("There was an error logging in:", error);
    }
  };

  return (
    <div className="login-box">
      <div className="back-page">
        <main className="form-signin w-100 m-auto modified-css">
          <form onSubmit={handleSubmit}>
            <img className="mb-4" src={logo} alt="" width="72" height="57" />
            <span className="spanX">Pinnacle HealthCare</span>
            <h1 className="h3 mb-3 fw-normal h1X">Login To Your Account</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state on input change
                required
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                required
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Sign in
            </button>
          </form>
        </main>
        <div className="img-div">
          <p className="pX">Pinnacle HealthCare</p>
          <img src={loginImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
