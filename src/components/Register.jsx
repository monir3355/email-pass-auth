import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    // if((?=.*[A-Z]).test(password)) {
    //   setError("added at least one Uppercase")
    // }
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
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setSuccess("You are successfully Registration!!");
        sendVerifyEmail(loggedUser);
        updateUserData(loggedUser, name);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const sendVerifyEmail = (user) => {
    sendEmailVerification(user).then((result) => {
      console.log(result);
      alert("Please Verify Email address");
    });
  };
  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name,
    })
      .then(() => {
        console.log("user name updated");
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <h3>Please Registration</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            required
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
          Register
        </Button>
        <p>
          <small>
            If you already have account please <Link to="/login">Login</Link>
          </small>
        </p>
        <p className="text-danger">{error}</p>
        <p className="text-success">{success}</p>
      </Form>
    </div>
  );
};

export default Register;
