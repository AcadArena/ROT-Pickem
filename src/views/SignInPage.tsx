import { makeStyles } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import SignIn from "../comps/SignIn";

const mcs = makeStyles({
  signInPage: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const SignInPage: React.FC<RouteComponentProps> = ({ match }) => {
  const c = mcs();
  console.log(match);
  return (
    <div className={c.signInPage}>
      <SignIn />
    </div>
  );
};

export default withRouter(SignInPage);
