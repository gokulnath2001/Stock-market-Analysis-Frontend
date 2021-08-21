import React, { useEffect, useState } from "react";
import {
  Grid,
  Container,
  Typography,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import KeyboardArrowRightRoundedIcon from "@material-ui/icons/KeyboardArrowRightRounded";
import { APIservice } from "../../api.service";
import { jsonDecoder } from "../../script";
import { BasicTable } from "../../components/Table";
import { useToasts } from "react-toast-notifications";

export const Home = () => {
  const { addToast } = useToasts();
  const [dataCount, setDataCount] = useState({ indexCount: 0, stockCount: 0 });
  const [skipMA, setSkipMA] = useState(0);
  const [skipIndex, setSkipIndex] = useState(0);
  const [topGainers, setTopGainers] = useState({
    tableHeaders: "",
    tableData: "",
  });
  const [topLosers, setTopLosers] = useState({
    tableHeaders: "",
    tableData: "",
  });
  const [indices, setIndices] = useState({ tableHeaders: "", tableData: "" });
  const [marketAction, setMarketAction] = useState({
    tableHeaders: "",
    tableData: "",
  });
  const [active, setActive] = useState({ tableHeaders: "", tableData: "" });
  const [potential, setPotential] = useState({
    tableHeaders: "",
    tableData: "",
  });
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [skipMA, skipIndex]);
  useEffect(() => {}, [
    topGainers,
    topLosers,
    indices,
    marketAction,
    active,
    potential,
    dataCount,
    skipMA,
    skipIndex,
  ]);
  const getData = async () => {
    try {
      const resultCount = await APIservice.getCount();
      setDataCount(resultCount);
      const resultTopGainers = await APIservice.getTopGainers();
      setTopGainers(jsonDecoder(resultTopGainers));
      const resultTopLosers = await APIservice.getTopLosers();
      setTopLosers(jsonDecoder(resultTopLosers));
      const resultMarketAction = await APIservice.getMarketAction(skipMA);
      setMarketAction(jsonDecoder(resultMarketAction));
      const resultIndices = await APIservice.getIndices(skipIndex);
      setIndices(jsonDecoder(resultIndices));
      const resultActiveStocks = await APIservice.getMostActive();
      setActive(jsonDecoder(resultActiveStocks));
      const resultUpPotential = await APIservice.getUpwardPotential();
      setPotential(jsonDecoder(resultUpPotential));
    } catch (error) {
      addToast(error.message, { appearance: "error" });
    }
  };
  return (
    <div>
      <Container maxWidth="lg">
        <Typography
          component={"h3"}
          variant="h3"
          color="textPrimary"
          style={{ margin: "20px 0 5px 0" }}
          align="center"
        >
          Market Action
        </Typography>
        <Divider
          style={{
            margin: "0 auto 10px auto",
            width: "70%",
            maxWidth: "400px",
          }}
        />
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              TOP GAINERS
            </Typography>
            {topGainers.tableData ? (
              <BasicTable table={topGainers} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              TOP LOSERS
            </Typography>
            {topLosers.tableData ? (
              <BasicTable table={topLosers} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              <IconButton
                disabled={!Boolean(skipIndex)}
                onClick={() => setSkipIndex((prev) => prev - 10)}
              >
                <KeyboardArrowLeftRoundedIcon />
              </IconButton>
              INDICES
              <IconButton
                disabled={dataCount.indexCount - skipIndex < 10}
                onClick={() => setSkipIndex((prev) => prev + 10)}
              >
                <KeyboardArrowRightRoundedIcon />
              </IconButton>
            </Typography>
            {indices.tableData ? (
              <BasicTable table={indices} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              display="block"
              component="h5"
              align="center"
            >
              <IconButton
                disabled={!Boolean(skipMA)}
                onClick={() => setSkipMA((prev) => prev - 10)}
              >
                <KeyboardArrowLeftRoundedIcon />
              </IconButton>
              MARKET ACTION
              <IconButton
                disabled={dataCount.stockCount - skipIndex < 10}
                onClick={() => setSkipMA((prev) => prev + 10)}
              >
                <KeyboardArrowRightRoundedIcon />
              </IconButton>
            </Typography>
            {marketAction.tableData ? (
              <BasicTable table={marketAction} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
        </Grid>
        <Typography
          component={"h3"}
          variant="h3"
          color="primary"
          style={{ margin: "20px 0 5px 0" }}
          align="center"
        >
          Stock Action
        </Typography>
        <Divider
          style={{
            margin: "0 auto 10px auto",
            width: "70%",
            maxWidth: "400px",
          }}
        />
        <Grid container justify="center" spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              ACTIVE STOCKS
            </Typography>
            {active.tableData ? (
              <BasicTable table={active} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center">
              UPWARD POTENTIAL
            </Typography>
            {potential.tableData ? (
              <BasicTable table={potential} />
            ) : (
              <Skeleton variant="rect" animation="wave" height="500px" />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
