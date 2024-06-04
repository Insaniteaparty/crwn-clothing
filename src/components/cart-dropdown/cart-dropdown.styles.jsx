import styled from "styled-components";
// import {
//   BaseButton,
//   GoogleSignInButton,
//   InvertedButton,
// } from "../custom-button/custom-button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ::-webkit-scrollbar {
    display: none;
  }

  // if I want to target specific custom components, I can do so
  /* \${BaseButton},
     \${GoogleSignInButton},
     \${InvertedButton}, */
  button {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;
