import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  TextField,
  OutlinedInput,
} from "@mui/material";
import "./Form.css";
import { getValue } from "@mui/system";

function Form() {
  const [isPassword, setisPassword] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const checkIsValidEmail = () => {
    if (newUserData.email.includes("@")) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const checkIsValidPassword = () => {
    if (newUserData.password.length > 5) {
      setIsValidPassword(true);
      return true;
    } else {
      setIsValidPassword(false);
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = checkIsValidEmail();
    const password = checkIsValidPassword();
    email && password ? console.alert("submitted!") : console.alert("Error");
  };

  return (
    <div>
      <FormControl className="form">
        <InputLabel htmlFor="email">Email</InputLabel>
        <OutlinedInput
          id="email"
          error={isValidEmail ? false : true}
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <TextField
          htmlFor="username"
          required={true}
          type="text"
          id="username"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <TextField
          htmlFor="password"
          required={true}
          type={isPassword ? "password" : "text"}
          placeholder="Password"
          name="password"
          onChange={handleChange}
          error={isValidPassword ? false : true}
        />
        <TextField
          htmlFor="confirmPassword"
          required={true}
          type={isPassword ? "password" : "text"}
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </FormControl>
    </div>
  );
}

export default Form;
