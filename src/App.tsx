import { makeStyles } from "@material-ui/core";
import React from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Switch } from "react-router-dom";
// import { projectAuth } from "./config/firebase";
// import SignInDialog from "./dialogs/SignInDialog";
import Match from "./views/Match";
import NotFound from "./views/NotFound";
import SignInPage from "./views/SignInPage";
const makeComponentStyles = makeStyles((theme) => ({
  app: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    overflow: "hidden",
  },
}));

function App() {
  const classes = makeComponentStyles();
  // const [user] = useAuthState(projectAuth);
  // const [state, setState] = React.useState<boolean>(false);

  // React.useEffect(() => {
  //   if (user) return setState(false);
  //   setState(true);
  // }, [user]);

  return (
    <div className={classes.app}>
      <Switch>
        <Route path="/:tournamentId/:matchId" exact>
          <Match />
        </Route>
        <Route path="/signin" exact>
          <SignInPage />
        </Route>
        <Route path="/">
          <NotFound />
        </Route>
      </Switch>
      {/* <SignInDialog open={state}></SignInDialog> */}
    </div>
  );
}

export default App;
