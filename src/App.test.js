import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// runs before each test
beforeEach(() => {
  render(<App />);
});

// // runs once before all tests
// beforeAll(() => {
//   console.log("this will run once, before any test has run");
// });

// // runs after each test
// afterEach(() => {
//   console.log("this will run after each test");
// });

// // runs after all tests have finished
// afterAll(() => {
//   console.log("this will run after all tests have finished ");
// });

const typeIntoForm = ({ email, username, password, confirmPassword }) => {
  const emailInputElement = screen.getByPlaceholderText(/email/i);
  if (email) userEvent.type(emailInputElement, email);

  const usernameInputElement = screen.getByPlaceholderText(/username/i);
  if (username) userEvent.type(usernameInputElement, username);

  const pwInputElement = screen.getByPlaceholderText("Password");
  if (password) userEvent.type(pwInputElement, password);

  const confirmPwInputElement =
    screen.getByPlaceholderText(/confirm password/i);
  if (confirmPassword) userEvent.type(confirmPwInputElement, confirmPassword);

  return {
    emailInputElement,
    usernameInputElement,
    pwInputElement,
    confirmPwInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitButtonElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.click(submitButtonElement);
};

describe("test form validation", () => {
  it("passes if the email input is empty on render", () => {
    expect(screen.getByPlaceholderText(/email/i).value).toBe("");
  });

  it("passes if the username input is empty on render", () => {
    expect(screen.getByPlaceholderText(/username/i).value).toBe("");
  });

  it("passes if the password element is empty on render", () => {
    expect(screen.getByPlaceholderText("Password").value).toBe("");
  });

  it("passes if the confirm password element is initially empty", () => {
    expect(screen.getByPlaceholderText(/confirm password/i).value).toBe("");
  });

  it("passes if all text input elements are initially empty", () => {
    const allInputElements = screen.getAllByRole("textbox");
    allInputElements.forEach((element) => {
      expect(element.value).toBe("");
    });
  });
});

describe("should be able to type inside inputs", () => {
  it("should be able to type an email", async () => {
    const { emailInputElement } = typeIntoForm({ email: "saskia@gmail.com" });
    expect(emailInputElement.value).toBe("saskia@gmail.com");
  });

  it("should be able to type a username", async () => {
    const { usernameInputElement } = typeIntoForm({
      username: "saskia",
    });
    expect(usernameInputElement.value).toBe("saskia");
  });

  it("should be able to type a password", async () => {
    const { pwInputElement } = typeIntoForm({ password: "123456" });
    expect(pwInputElement.value).toBe("123456");
  });

  it("should be able to type confirm password", async () => {
    const { confirmPwInputElement } = typeIntoForm({
      confirmPassword: "123456",
    });
    expect(confirmPwInputElement.value).toBe("123456");
  });
});

describe("error handling", () => {
  describe("should show error message on invalid inputs", () => {
    it("should show error message on invalid email", () => {
      typeIntoForm({ email: "testing" });
      expect(
        screen.getByText(/please enter a valid email/i)
      ).toBeInTheDocument();
    });
    it("should not show error message on valid email", () => {
      typeIntoForm({ email: "testing@gmail.com" });
      expect(
        screen.queryByText(/please enter a valid email/i)
      ).not.toBeInTheDocument();
    });
    it("should show error message if password is shorter than 6 characters", () => {
      typeIntoForm({ password: "12345" });
      expect(
        screen.getByText(/password must be longer than 5 characters/i)
      ).toBeInTheDocument();
    });
    it("should not show error message if password is >5 characters", () => {
      typeIntoForm({ password: "12345678" });
      expect(
        screen.queryByText(/password must be longer than 5 characters/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("tests if password and confirm password match", () => {
    /// you can run beforeEach , afterEach etc inside describe blocks
    it("shows error message if passwords do not match", () => {
      typeIntoForm({
        password: "123456",
        confirmPassword: "abcdefg",
      });

      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });

    it("does not show error message if passwords match", () => {
      typeIntoForm({
        password: "123456",
        confirmPassword: "123456",
      });
      expect(
        screen.queryByText(/passwords do not match/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("shows no errors on submit if inputs are valid", () => {
    test("shows no error messages on submit if every input is valid", () => {
      clickOnSubmitButton();
      expect(
        screen.queryByText(/please enter a valid email/i) &&
          screen.queryByText(/passwords do not match/i) &&
          screen.queryByText(/password must be longer than 5 characters/i)
      ).not.toBeInTheDocument();
    });
  });
});
