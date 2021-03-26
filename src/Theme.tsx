import React from "react";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

const Theme: React.FC = ({ children }) => {
  const theme = responsiveFontSizes(
    createMuiTheme({
      spacing: 5,
      typography: {
        fontWeightRegular: 300,
        h4: {
          fontWeight: 300,
          fontSize: 18.2,
          color: "#3C4858",
          marginBottom: 3,
        },
      },
      palette: {
        warning: {
          main: "#d13639",
        },
        // type: "dark",
        primary: {
          main: "#9c27b0",
          light: "#af52bf",
          dark: "#6d1b7b",
        },
        secondary: {
          main: "#e53935",
        },
      },
    })
  );
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
