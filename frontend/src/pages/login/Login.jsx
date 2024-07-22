import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { apiUrl, getError } from "../../utils";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    alert("clicked again");
    try {
      const { data } = await axios.post(`${apiUrl}/api/users/login`, {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      alert(getError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Enter your email</label>
        <input
          type="email"
          className="loginInput"
          placeholder="Enter your email..."
          ref={emailRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
