import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BasePage from "./BasePage";
import { ErrorContext } from "../main";

export default function Login() {
  const loginFormRef = useRef(null);
  const navigate = useNavigate();
  const { addError, clearErrors } = useContext(ErrorContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(loginFormRef.current);

    const response = await fetch("/api/login/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });

    console.log("response", response);

    if (!response.ok) {
      const data = await response.json();
      addError({ msg: data.msg, type: "danger" });
    } else {
      // Login successful
      clearErrors();
      addError({ msg: "Login successful", type: "success" });
      navigate("/"); // Navigate to dashboard or home page
    }
  };

  return (
    <BasePage>
      <div className="form-signin w-100 m-auto">
        <form ref={loginFormRef} onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              name="username"
              required
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              name="password"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign in
          </button>
        </form>
        <button
          className="btn btn-secondary w-100 py-2 mt-2"
          onClick={() => navigate("/register")}
        >
          Go to Sign Up
        </button>
      </div>
    </BasePage>
  );
}