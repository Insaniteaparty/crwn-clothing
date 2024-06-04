import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./custom-button.styles";

export const BUTTON_TYPE_CLASS = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASS.base) =>
  ({
    [BUTTON_TYPE_CLASS.base]: BaseButton,
    [BUTTON_TYPE_CLASS.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASS.inverted]: InvertedButton,
  }[buttonType]);

const CustomButton = ({ children, buttonType, ...otherProps }) => {
  const ButtonType = getButton(buttonType);

  return <ButtonType {...otherProps}>{children}</ButtonType>;
};

export default CustomButton;
