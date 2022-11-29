import React, { useState } from "react";
import Userinput from "./Components/Userinput";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function App() {
  const [roll, setRoll] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (roll !== "" && password !== "") {
      axios
        .post("http://localhost:5000/login", {
          roll,
          password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          setLogin(true);
          navigate("/user");
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    }
  };
  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target.name === "roll") {
      setRoll(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (roll !== "" && password !== "") {
      axios
        .post("http://localhost:5000/register", {
          roll,
          password,
        })
        .then((response) => {
          alert(response.data.message);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const renderForm = (
    <div className="form">
      <div className="title">Schedule Creator Portal </div>
      <form>
        <div className="input-container">
          <label>User Name</label>
          <input
            type="text"
            name="roll"
            value={roll}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="button-container">
          <input type="submit" value={"Log In"} onClick={handleSubmit} />
          <input type="submit" onClick={handleSignup} value={"Sign Up"} />
        </div>
      </form>
    </div>
  );
  if (login) {
    return (
      <>
        <Userinput />
      </>
    );
  } else {
    return (
      <div className="app">
        <div className="login-form">{renderForm}</div>
      </div>
    );
  }
}

export default App;
