import React, { useContext, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  TextField,
  IconButton,
  Button,
  Link,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/styles";
import { APIservice } from "../../api.service";
import { useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles({
  form: {
    height: "455px",
    width: "80%",
    maxWidth: "350px",
  },
  title: {
    margin: "40px 0 0",
  },
  fields: {
    margin: "10px 5%",
    width: "90%",
  },
});

export const Register = () => {
  const { addToast } = useToasts();
  let regex = new RegExp(`^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`);
  const { user, dispatch } = useContext(userContext);
  const classes = useStyles();
  const history = useHistory();
  const [password, setPassword] = useState({
    hidden: true,
    value: "",
  });
  const [mail, setMail] = useState("");
  const handleVisibility = () => {
    setPassword({ ...password, hidden: !password.hidden });
  };
  const handleSubmit = async () => {
    try {
      const user = { mail, password: password.value };
      setMail("");
      setPassword({ hidden: true, value: "" });
      if (!Boolean(user.mail) || Boolean(user.mail) ^ Boolean(user.password))
        throw new Error("Fill all the fields");
      if (!regex.test(user.mail)) throw new Error("Invalid Mail ID");
      const data = await APIservice.register(user);
      if (data.message.toLowerCase() === "success") {
        addToast(`Welcome, ${user.mail}`, { appearance: "success" });
        const userJSON = JSON.stringify(user);
        localStorage.setItem("user", userJSON);
        dispatch({ type: "ADD_USER", value: user });
        history.push("/");
      }
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };
  return (
    <>
      {user ? (
        history.push("/")
      ) : (
        <Grid container justify="center" style={{ margin: "20px 0" }}>
          <Paper
            className={classes.form}
            component={Grid}
            container
            item
            xs={10}
            sm={8}
            md={6}
            elevation={4}
          >
            <Grid container direction="column" justify="space-between" item>
              <Typography
                component={Grid}
                item
                className={classes.title}
                align="center"
                variant="h4"
              >
                Account Register
              </Typography>
              <Grid container direction="column" justify="center">
                <FormControl className={classes.fields}>
                  <TextField
                    variant="outlined"
                    type="email"
                    value={mail}
                    fullWidth
                    label="E-Mail ID"
                    onChange={(event) => setMail(event.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.fields}>
                  <TextField
                    variant="outlined"
                    label="Password"
                    value={password.value}
                    fullWidth
                    type={password.hidden ? "password" : "text"}
                    onChange={(event) =>
                      setPassword({ ...password, value: event.target.value })
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => handleVisibility()}>
                          {password.hidden ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={handleSubmit}
              >
                Create
              </Button>
            </Grid>
          </Paper>
          <Typography
            variant="subtitle1"
            component={Grid}
            item
            xs={10}
            align="center"
          >
            <Link href="/register">Already have an account? Login!</Link>
          </Typography>
        </Grid>
      )}{" "}
      }{" "}
    </>
  );
};
