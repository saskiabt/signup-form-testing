import React, { useState, useEffect } from "react";
import validator from "validator";
import "./Form.css";

function Form() {
  const [isPassword, setisPassword] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [newUserData, setNewUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isMatchingPasswords, setIsMatchingPasswords] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };

  const resetUserData = () => {
    setNewUserData({
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isValidEmail && isValidPassword && isMatchingPasswords) {
      console.log("logged in");
      resetUserData();
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const checkIsValidEmail = () => {
      if (validator.isEmail(newUserData.email) === true) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    };

    const checkIsValidPassword = () => {
      if (newUserData.password.length > 5) {
        setIsValidPassword(true);
      } else {
        setIsValidPassword(false);
      }
    };

    const matchPasswords = () => {
      if (newUserData.password === newUserData.confirmPassword)
        return setIsMatchingPasswords(true);
      return setIsMatchingPasswords(false);
    };

    if (newUserData.email.length > 0) checkIsValidEmail();
    if (newUserData.password.length > 0) checkIsValidPassword();
    if (newUserData.confirmPassword.length > 0) matchPasswords();
  }, [newUserData.confirmPassword, newUserData.email, newUserData.password]);

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          {isValidEmail === false && (
            <p className="helper-text">Please enter a valid email</p>
          )}
          <input
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="Email"
          ></input>
        </label>
        <label htmlFor="username">
          <input
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="Username"
          ></input>
        </label>
        <label htmlFor="password">
          {isValidPassword === false && (
            <p className="helper-text">
              Password must be longer than 5 characters
            </p>
          )}
          <input
            type={isPassword ? "password" : "text"}
            onChange={handleChange}
            name="password"
            placeholder="Password"
          ></input>
        </label>
        <label htmlFor="confirmPassword">
          <input
            type={isPassword ? "password" : "text"}
            onChange={handleChange}
            name="confirmPassword"
            placeholder="Confirm password"
          ></input>
          {isMatchingPasswords === false && (
            <p className="helper-text">Passwords do not match</p>
          )}
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="confirmation"></div>
    </div>
  );
}

export default Form;
