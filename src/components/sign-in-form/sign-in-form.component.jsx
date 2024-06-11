import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton, {
  BUTTON_TYPE_CLASS,
} from "../custom-button/custom-botton.component";

// I'll cheat and use sign-up's style
import "../sign-up-form/sign-up-form.styles.scss";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const initFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(initFields);
  const { email, password } = formFields;

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(initFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-credential"
      ) {
        alert("Warning: wrong username or password!");
      } else console.log(error.message);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            buttonType={BUTTON_TYPE_CLASS.google}
            onClick={logGoogleUser}
          >
            google sign in
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
