// this file is just an example on how the signign with redirect is performed and is not used inside the project
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  signInWithGoogleRedirect,
  crateUserDocumentFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

const SignInRedirect = () => {
  useEffect(() => {
    async function logWRedirect() {
      const response = await getRedirectResult(auth);
      console.log(response);
      if (response) {
        crateUserDocumentFromAuth(response.user);
      }
    }
    logWRedirect();
  }, []);
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={signInWithGoogleRedirect}>
        {" "}
        sign in with gugol redirect
      </button>
    </div>
  );
};

export default SignInRedirect;
