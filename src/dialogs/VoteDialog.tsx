import { Button, Dialog, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { PollItemProps } from "../config/types";
import firebase, {
  projectAuth,
  projectFirestore as db,
} from "../config/firebase";
import Alert from "@material-ui/lab/Alert";
import Loading from "../comps/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";

interface VoteDialogProps {
  open: boolean;
  onClose?: () => void;
  poll?: PollItemProps;
  docRef?: firebase.firestore.DocumentReference;
}

const mcs = makeStyles((theme) => ({
  voteDialog: {
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  poll: {
    display: "flex",
    "& .left": {
      marginRight: 10,
      backgroundColor: "rgba(156, 39, 176, .1)",
    },
    "& .right": {
      marginLeft: 10,
      backgroundColor: "rgba(244, 67, 54, .10)",
    },
    "& .team": {
      marginTop: 15,
      marginBottom: 15,
      height: 150,
      width: 150,
      flexShrink: 0,
      borderRadius: 5,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      cursor: "pointer",
      transition: "0.1s cubic-bezier(0.33, 1, 0.68, 1)",
    },
  },
  loading: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,.9)",
    zIndex: 99,
  },
}));

const VoteDialog: React.FC<VoteDialogProps> = ({
  open,
  onClose = () => {},
  poll,
  docRef,
}) => {
  const c = mcs();
  const [selected, setSelected] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [user] = useAuthState(projectAuth);
  const [userData, setUserData] = React.useState<any>();

  React.useEffect(() => {
    if (!user) return;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((u) => {
        if (u.exists) {
          setUserData(u.data());
        }
      });
  }, [user, setUserData]);

  const vote = () => {
    setLoading(true);
    const isTeam1 = selected === poll?.team1;
    if (isTeam1) {
      docRef
        ?.update({
          team1_votes: firebase.firestore.FieldValue.increment(1),
          vote_ids: firebase.firestore.FieldValue.arrayUnion(user?.uid ?? ""),
          team1_votes_id: firebase.firestore.FieldValue.arrayUnion(
            user?.uid ?? ""
          ),
          votes: [
            ...(poll?.votes ?? []),
            {
              id: user?.uid ?? "",
              vote: "team1",
              vote_team_id: poll?.team1?.id ?? "",
              date_created: firebase.firestore.Timestamp.now(),
              email: user?.email ?? "",
              fb_link: userData.profile?.link ?? "",
              fb_id: userData?.profile?.id ?? "",
              name: user?.displayName ?? "",
              picture: userData?.profile?.picture?.data?.url ?? "",
            },
          ],
        })
        .then(() => {
          setLoading(false);
          onClose();
          swal({
            title: "Vote Successful",
            icon: "success",
            timer: 3000,
          });
        })
        .catch((err) => {
          swal({
            title: "Something Went Wrong",
            text: "Vote unsucessful",
            icon: "error",
            timer: 3000,
          });
        });
    } else {
      docRef
        ?.update({
          team2_votes: firebase.firestore.FieldValue.increment(1),
          vote_ids: firebase.firestore.FieldValue.arrayUnion(user?.uid + ""),
          team2_votes_id: firebase.firestore.FieldValue.arrayUnion(
            user?.uid + ""
          ),
          votes: [
            ...(poll?.votes ?? []),
            {
              id: user?.uid ?? "",
              vote: "team2",
              vote_team_id: poll?.team2?.id ?? "",
              date_created: firebase.firestore.Timestamp.now(),
              email: user?.email ?? "",
              fb_link: userData.profile?.link ?? "",
              fb_id: userData?.profile?.id ?? "",
              name: user?.displayName ?? "",
              picture: userData?.profile?.picture?.data?.url ?? "",
            },
          ],
        })
        .then(() => {
          setLoading(false);
          onClose();
          swal({
            title: "Vote Successful",
            icon: "success",
            timer: 3000,
          });
        })
        .catch((err) => {
          swal({
            title: "Something Went Wrong",
            text: "Vote unsucessful",
            icon: "error",
            timer: 3000,
          });
        });
    }
  };
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: c.voteDialog }}>
      {loading && <Loading className={c.loading} />}
      <Alert severity="info">You cannot modify nor remove your vote</Alert>

      <div className={c.poll}>
        <div
          className="team left"
          onClick={() => setSelected(poll?.team1)}
          style={{
            backgroundImage: `url(${poll?.team1?.logo})`,
            boxShadow:
              selected === poll?.team1
                ? "0px 10px 8px rgba(0,0,0,.25)"
                : "none",
            transform:
              selected === poll?.team1 ? "translateY(-5px)" : "translateY(0px)",
          }}
        ></div>
        <div
          className="team right"
          onClick={() => setSelected(poll?.team2)}
          style={{
            backgroundImage: `url(${poll?.team2?.logo})`,
            boxShadow:
              selected === poll?.team2
                ? "0px 10px 8px rgba(0,0,0,.25)"
                : "none",
            transform:
              selected === poll?.team2 ? "translateY(-5px)" : "translateY(0px)",
          }}
        ></div>
      </div>
      <Button
        style={{ marginTop: 10 }}
        variant="contained"
        color={selected === poll?.team2 ? "secondary" : "primary"}
        disabled={
          (selected !== poll?.team2 && selected !== poll?.team1) || loading
        }
        onClick={vote}
      >
        Vote Now
      </Button>
    </Dialog>
  );
};

export default VoteDialog;
