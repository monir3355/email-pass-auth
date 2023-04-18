import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const emailRef = useRef();
  const handleLogin = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    // console.log(event.target);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("at least one uppercase");
      return;
    } else if (!/(?=.*[!#$%&? "])/.test(password)) {
      setError("at least special key");
      return;
    } else if (password.length < 6) {
      setError("please input 6 or more letter");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("User Login successfully");
        setError("");
        if (loggedUser.emailVerified) {
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const handleResetPass = (event) => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please Enter Your Email");
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please Check Your Email");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  return (
    <div className="w-50 mx-auto">
      <h3>Please Login</h3>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            ref={emailRef}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          <Form.Check
            onClick={() => setShowPass(!showPass)}
            type="checkbox"
            label="Show Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <p>
          <small>
            Please Forget Your Password{" "}
            <button onClick={handleResetPass} className="btn btn-link">
              Reset Password
            </button>
          </small>
        </p>
        <p>
          <small>
            If you don't have account please{" "}
            <Link to="/register">Registration</Link>
          </small>
        </p>
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </Form>
    </div>
  );
};

export default Login;
