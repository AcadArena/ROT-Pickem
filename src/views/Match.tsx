import {
  Button,
  Container,
  makeStyles,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { projectAuth, projectFirestore } from "../config/firebase";
import { PollItemProps } from "../config/types";
import { ReactComponent as BattleSvg } from "../assets/imgs/battle.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import SignInDialog from "../dialogs/SignInDialog";
// import { formatDistanceToNow } from "date-fns";
// import { compareDesc } from "date-fns/esm";
import VoteDialog from "../dialogs/VoteDialog";
import { Spring } from "react-spring/renderprops-universal";
import Loading from "../comps/Loading";

const makeComponentStyles = makeStyles((theme) => ({
  matchPage: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  match: {
    display: "flex",
    width: "100%",

    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },

    "& .vs": { alignSelf: "center", height: 75, width: 75, margin: 10 },

    "& .left": {
      // backgroundColor: "rgba(156, 39, 176, .1)",
      backgroundColor: "rgba(156, 39, 176, 1)",
    },
    "& .right": {
      // backgroundColor: "rgba(244, 67, 54, .10)",
      backgroundColor: "rgba(244, 67, 54, .8)",
    },

    "& .team": {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexShrink: 0,
      padding: theme.spacing(8),
      margin: 40,
      borderRadius: 10,
      [theme.breakpoints.down("md")]: {
        margin: "2%",
      },

      "& .logo": {
        width: 300,
        height: 200,
        filter: "drop-shadow(0 8px 8px rgba(0,0,0,.2))",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        marginBottom: 10,
      },
      "& .org": {
        textTransform: "uppercase",
        textAlign: "center",
        fontFamily: "'Anton'",
        fontSize: "2rem",
        color: "#fff",
      },

      "& .school": {
        lineHeight: 1,
        textAlign: "center",
      },
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  comparisonBar: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 40px",

    [theme.breakpoints.down("md")]: {
      padding: "20px 2%",
    },
    "& .bar": {
      height: 50,
      backgroundColor: "rgba(244, 67, 54, .8)",
      "& .result": {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(156, 39, 176, 1)",
        transition: "0.6s cubic-bezier(0.33, 1, 0.68, 1)",
      },
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,

    "& .tournament": {
      "& .value": {
        cursor: "pointer",
      },
    },

    "& .detail": {
      display: "flex",
      flexDirection: "column",
      marginBottom: 20,
      alignItems: "center",

      "& .caption": {
        color: "#aaa",
      },

      "& .value": {
        // fontSize: 30,
        fontFamily: "Anton",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#3C4858",
      },
    },
  },
}));

const Match: React.FC<
  RouteComponentProps<{ tournamentId: string; matchId: string }>
> = ({ match: { params }, location: { pathname } }) => {
  const classes = makeComponentStyles();
  // const tournamentDocRef = projectFirestore.doc(
  //   `tournaments/${params.tournamentId}`
  // );
  const docRef = projectFirestore.doc(
    `tournaments/${params.tournamentId}/poll/${params.matchId}`
  );
  const [poll, loading] = useDocumentData<PollItemProps>(docRef);
  const [dialogState, setDialogState] = React.useState<boolean>(false);
  const [voteState, setVoteState] = React.useState<boolean>(false);
  const [user] = useAuthState(projectAuth);

  // totalvotes = team1_votes + team2_votes
  // leftteam% = (team1_votes / totalvotes) * 100

  const getPos = (): number => {
    let totalVotes: number =
      (poll?.team1_votes ?? 0) + (poll?.team2_votes ?? 0);
    let pos = ((poll?.team1_votes ?? 0) / totalVotes) * 100;

    return totalVotes > 0 ? pos : 50;
  };

  const pickEm = () => {
    if (!user) return setDialogState(true);
    setVoteState(true);
  };

  const gotoChallonge = () => {
    window.open(`https://challonge.com/${poll?.tournament_url}`, "_blank");
  };

  return (
    <div className={classes.matchPage}>
      {loading ? (
        <Loading />
      ) : poll && poll.is_published ? (
        <Spring
          from={{ opacity: 0, transform: "translateY(-15px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
        >
          {(props) => (
            <Container
              className={classes.container}
              maxWidth="lg"
              style={props}
            >
              <div className={classes.match}>
                <div className="team left">
                  <div
                    className="logo"
                    style={{ backgroundImage: `url(${poll.team1?.logo})` }}
                  ></div>
                  <Typography variant="h4" className="org">
                    {poll.team1?.org_name}
                  </Typography>
                  <Typography variant="h4" className="school">
                    {poll.team1?.university_name}
                  </Typography>
                </div>
                <SvgIcon className="vs" fontSize="large">
                  <BattleSvg />
                </SvgIcon>
                <div className="team right">
                  <div
                    className="logo"
                    style={{ backgroundImage: `url(${poll.team2?.logo})` }}
                  ></div>
                  <Typography variant="h4" className="org">
                    {poll.team2?.org_name}
                  </Typography>
                  <Typography variant="h4" className="school">
                    {poll.team2?.university_name}
                  </Typography>
                </div>
              </div>
              <div className={classes.comparisonBar}>
                <div className="bar">
                  <div
                    className="result"
                    style={{
                      clipPath: `polygon(0% 0%, ${getPos()}% 0%, ${getPos()}% 100%, 0% 100%)`,
                    }}
                  ></div>
                </div>
              </div>

              <div className={classes.details}>
                <div className="tournament detail">
                  <Typography variant="caption" className="caption">
                    Tournament
                  </Typography>
                  <Typography
                    variant="h5"
                    className="value"
                    onClick={gotoChallonge}
                  >
                    {poll.tournament_name}
                  </Typography>
                </div>
                <div className="stage detail">
                  <Typography variant="caption" className="caption">
                    Stage
                  </Typography>
                  <Typography variant="h5" className="value">
                    {poll.is_groups ? "Group Stage" : "Playoffs"} Round{" "}
                    {Math.abs(poll.match_round)}
                    {poll.match_round < 0 && " Lower Bracket"}
                  </Typography>
                </div>

                {/* <div className="expiry">
                  {compareDesc(new Date(), poll.expiry_date_time.toDate()) === 1
                    ? `Closes in: ${formatDistanceToNow(
                        poll.expiry_date_time.toDate()
                      )}`
                    : `Closed ${formatDistanceToNow(
                        poll.expiry_date_time.toDate(),
                        { addSuffix: true, includeSeconds: true }
                      )}`}
                </div> */}
                {poll.is_closed && <div className="expiry">Poll is closed</div>}
                {!poll.vote_ids.includes(user?.uid ?? "") ? (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={pickEm}
                    disabled={
                      // compareDesc(
                      //   new Date(),
                      //   poll.expiry_date_time.toDate()
                      // ) === -1
                      poll.is_closed
                    }
                  >
                    Pick'Em
                  </Button>
                ) : (
                  <div>
                    You have voted{" "}
                    {
                      poll[
                        poll.votes.find((v) => v.id === user?.uid)?.vote ??
                          "team1"
                      ]?.org_name
                    }
                  </div>
                )}
              </div>
              <SignInDialog
                open={dialogState}
                onClose={() => setDialogState(false)}
              />
              <VoteDialog
                open={voteState}
                onClose={() => setVoteState(false)}
                docRef={docRef}
                poll={poll}
              />
            </Container>
          )}
        </Spring>
      ) : (
        <div>This match does not exists</div>
      )}
    </div>
  );
};

export default withRouter(Match);
