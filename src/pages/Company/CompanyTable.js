import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { BasicTable } from "../../components/Table";
import { APIservice } from "../../api.service";
import { jsonDecoder } from "../../script";

const useStyles = makeStyles({
  table: {
    margin: "20px 0",
  },
});

export const CompanyTable = () => {
  const [codes, setCodes] = useState({
    indices: [{ tableHeaders: "", tableData: "" }],
    stocks: [{ tableHeaders: "", tableData: "" }],
  });
  const classes = useStyles();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await APIservice.getCodes();
        if (!response) throw new Error("Server error");
        const indices = jsonDecoder(response.indices);
        const stocks = jsonDecoder(response.stocks);
        setCodes({ indices, stocks });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(codes);
  }, [codes]);
  return (
    <div>
      <Grid container justify="center">
        <Grid item sm={8} className={classes.table}>
          {codes.indices.tableData ? (
            <BasicTable table={codes.indices} />
          ) : (
            <Skeleton variant="rect" animation="wave" height="500px" />
          )}
        </Grid>
        <Grid item sm={8} className={classes.table}>
          {codes.stocks.tableData ? (
            <BasicTable table={codes.stocks} />
          ) : (
            <Skeleton variant="rect" animation="wave" height="500px" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};
