import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("test form validation", () => {
  it("passes if the email input is empty on render", () => {
    render(<App />);
    const emailInputElement = screen.getByPlaceholderText(/email/i);
    expect(emailInputElement.value).toBe("");
  });

  it("passes if the username input is empty on render", () => {
    render(<App />);
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    expect(usernameInputElement.value).toBe("");
  });

  it("passes if the password element is empty on render", () => {
    render(<App />);
    const pwInputElement = screen.getByPlaceholderText("Password");

    expect(pwInputElement.value).toBe("");
  });

  it("passes if the confirm password element is initially empty", () => {
    render(<App />);

    const confirmPwInputElement =
      screen.getByPlaceholderText(/confirm password/i);
    expect(confirmPwInputElement.value).toBe("");
  });

  it("passes if all text input elements are initially empty", () => {
    render(<App />);
    const allInputElements = screen.getAllByRole("textbox");

    allInputElements.forEach((element) => {
      expect(element.value).toBe("");
    });
  });
});

describe("should be able to type inside inputs", () => {
  it("should be able to type an email", async () => {
    render(<App />);
    const emailInputElement = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInputElement, "saskia@gmail.com");
    expect(emailInputElement.value).toBe("saskia@gmail.com");
  });

  it("should be able to type a username", async () => {
    render(<App />);
    const usernameInputElement = screen.getByPlaceholderText(/username/i);
    await userEvent.type(usernameInputElement, "saskia");
    expect(usernameInputElement.value).toBe("saskia");
  });

  it("should be able to type a password", async () => {
    render(<App />);
    const usernameInputElement = screen.getByPlaceholderText("Password");
    await userEvent.type(usernameInputElement, "saskia");
    expect(usernameInputElement.value).toBe("saskia");
  });

  it("should be able to type confirm password", async () => {
    render(<App />);
    const confirmPwInputElement = screen.getByPlaceholderText(/confirm/i);
    await userEvent.type(confirmPwInputElement, "saskia");
    expect(confirmPwInputElement.value).toBe("saskia");
  });
});

describe("should show error message on invalid inputs", () => {
  it("should show error message on invalid email", () => {
    render(<App />);
    const emailInputElement = screen.getByPlaceholderText(/Email/);
    userEvent.type(emailInputElement, "testing@gmail.com");
    const submitBtnElement = screen.getByRole("button", {
      name: /submit/i,
    });
    userEvent.click(submitBtnElement);
    const emailErrorElement = screen.getByText(/invalid email format/);
    expect(emailErrorElement).toBeInTheDocument();
  });
});
