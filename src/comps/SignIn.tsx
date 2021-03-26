import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import firebase, {
  projectAuth,
  projectFirestore as db,
} from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import FacebookIcon from "@material-ui/icons/Facebook";
import swal from "sweetalert";

const mcs = makeStyles({
  signIn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sweetAlert: {
    "& .swal-text": {
      textAlign: "center",
    },
  },
});

// https://graph.facebook.com/v10.0/me?fields=id%2Cname%2Clink%2Cpicture.type(large)&access_token=
var fbProvider = new firebase.auth.FacebookAuthProvider();
fbProvider.addScope("public_profile");
fbProvider.addScope("user_link");

// var googleProvider = new firebase.auth.GoogleAuthProvider();

interface SignInProps {
  onClose?: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onClose = () => null }) => {
  const c = mcs();
  const [user] = useAuthState(projectAuth);

  // React.useEffect(() => {
  //   if (!user) return;
  //   onClose();
  // }, [user]);

  const onSignOn = (
    provider:
      | firebase.auth.GoogleAuthProvider
      | firebase.auth.FacebookAuthProvider
  ) => () => {
    projectAuth
      .signInWithPopup(provider)
      .then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // @ts-ignore
        var accessToken = credential.accessToken;

        onClose();

        db.doc(`users/${user?.uid}`)
          .set({ ...result.additionalUserInfo, accessToken })
          .then(() => {
            console.log("Successfully updated user");
          });

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        swal({
          title: "Sign In Unsucessful",
          text: errorMessage,
          icon: "error",
          timer: 8000,
          className: c.sweetAlert,
        });
        // ...
      });
  };

  const signOut = () => {
    projectAuth.signOut().then(() => {
      console.log("logged out");
    });
  };

  return (
    <div className={c.signIn}>
      {user ? (
        <>
          <div className="">
            You are signed in as {user.displayName} (
            {user.providerData[0]?.providerId})
          </div>
          <Button variant="outlined" onClick={signOut}>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h4" style={{ paddingBottom: 10 }}>
            Sign In
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onSignOn(fbProvider)}
            startIcon={<FacebookIcon />}
          >
            Sign In with Facebook
          </Button>
        </>
      )}
      {/* <Button variant="outlined" onClick={onSignOn(googleProvider)}>
        Sign In with Google
      </Button> */}
    </div>
  );
};

export default SignIn;
