import React, { useEffect, useState } from "react";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Dialog,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { APIservice } from "../../api.service";
import { useHistory } from "react-router-dom";

export const FormDialog = () => {
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState(undefined);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {}, [company]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await APIservice.getCodes();
        setCompany(response.stocks);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Button
        variant="text"
        style={{ color: "#eee" }}
        onClick={handleClickOpen}
      >
        Company
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        style={{ minHeight: "300px" }}
      >
        <DialogTitle id="form-dialog-title">
          Get the latest stock updates
        </DialogTitle>
        {company ? (
          <div>
            <DialogContent>
              <DialogContentText>
                Search for the company.
                <br />
                To see available the Indian stock data go to{" "}
                <Button variant="outlined" href="/company">
                  Stock Table
                </Button>
              </DialogContentText>
              <Autocomplete
                id="company"
                options={company}
                value={search}
                onChange={(event, newValue) => {
                  setSearch(newValue);
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 300, margin: "0 auto" }}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{}}
                    style={{ color: "#eee" }}
                    {...params}
                  />
                )}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  console.log(search.BOMcode);
                  history.push({ pathname: `/company/${search.BOMcode}` });
                }}
                color="primary"
              >
                Go
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </div>
        ) : (
          <DialogContent
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <CircularProgress size={"2em"} />
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
