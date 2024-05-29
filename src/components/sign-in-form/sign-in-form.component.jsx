import { useState, useContext } from "react";

import { UserContext } from "../../contexts/user.context";
import {
  signInWithGooglePopup,
  crateUserDocumentFromAuth,
  signInAuthUserWithEmailAndPsw,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-botton.component";

// I'll cheat and use sign-up's style
import "../sign-up-form/sign-up-form.styles.scss";

const initFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await crateUserDocumentFromAuth(user);
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
      const { user } = await signInAuthUserWithEmailAndPsw(email, password);
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth.user-not-found"
      ) {
        alert("Warning: wrong useername or password!");
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
            buttonType="google"
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
