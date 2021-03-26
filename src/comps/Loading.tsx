import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const mcs = makeStyles((theme) => ({
  loading: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Loading: React.FC<{ className?: string }> = ({ className, ...props }) => {
  const c = mcs();
  return (
    <div className={c.loading + " " + className} {...props}>
      <CircularProgress />
    </div>
  );
};

export default Loading;
