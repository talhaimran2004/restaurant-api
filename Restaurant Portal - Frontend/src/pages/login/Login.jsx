import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsEyeSlash } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./login.scss";
import restaurantApi from "../../api/restaurantApi";

const Login = () => {
  return (
    <div className="login">
      <div className="header">
        <h2>Nation Bistro</h2>
        <h5>ONLINE FOOD PORTAL</h5>
      </div>

      <form
        className="form"
        method="POST"
        onSubmit={() => {
          document.cookie.split(";").forEach(function (c) {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(
                /=.*/,
                "=;expires=" + new Date().toUTCString() + ";path=/"
              );
            // window.history.back();
          });
        }}
        action="http://localhost:4000/api/auth/login"
      >
        <div>
          <input type="email" placeholder="Email" required name="email" />
          <AiOutlineMail className="icon" />
        </div>
        <div>
          <input type="password" placeholder="Password" required name="pass" />
          <BsEyeSlash className="icon" />
        </div>
        {/* <Link to={'/login'}>Forgot Password?</Link> */}
        <button type="submit">Sign in</button>
      </form>
      <p>
        Don't have an account?
        <span>
          {" "}
          <Link to={"/signup"}>Register</Link>{" "}
        </span>
      </p>
    </div>
  );
};

export default Login;
