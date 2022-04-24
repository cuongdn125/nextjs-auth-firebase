import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase";
const GoogleProvider = new GoogleAuthProvider();
const FacebookProvider = new FacebookAuthProvider();

const loginGoogle = (router) => {
  signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ credential, token, user });
      localStorage.setItem("accessToken", token);
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    });
};
const loginFacebook = async (router) => {
  signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ credential, token, user });
      localStorage.setItem("accessToken", token);
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/account-exists-with-different-credential") {
        console.log(
          "You have already signed up with a different auth provider for that email."
        );
      }
    });
};

const logout = (router) => {
  auth.signOut();
  localStorage.removeItem("accessToken");
  router.push("/login");
};

const registerWithEmailAndPassword = async (
  displayName: string,
  email: string,
  password: string,
  router
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    router.push("/login");
    console.log({ user });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const loginEmail = (email: string, password: string, router) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user: any = userCredential.user;
      localStorage.setItem("accessToken", user.accessToken);
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};

export {
  loginGoogle,
  loginFacebook,
  loginEmail,
  registerWithEmailAndPassword,
  logout,
};
