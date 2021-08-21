import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { FormDialog } from "../Dialog";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

export const Navbar = () => {
  const { addToast } = useToasts();
  const { user, dispatch } = useContext(userContext);
  const history = useHistory();
  const classes = useStyles();
  const handleLogout = () => {
    addToast(`Logged out`, { appearance: "info" });
    localStorage.clear();
    dispatch({ type: "REMOVE_USER" });
    history.push("/");
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="left" className={classes.title}>
            <IconButton
              href="/"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <ShowChartIcon />
            </IconButton>
            Stock Market Analysis
          </Typography>
          {user ? (
            <>
              <Button disabled style={{ color: "#eee" }}>
                Logged in as {user.mail}
              </Button>
              <FormDialog />
              <Button style={{ color: "#eee" }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <FormDialog />
              <Button href="/register" style={{ color: "#eee" }}>
                Register
              </Button>
              <Button href="/login" style={{ color: "#eee" }}>
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
