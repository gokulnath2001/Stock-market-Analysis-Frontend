import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "../../canvasjs";
import { LinearProgress } from "@material-ui/core";
import { APIservice } from "../../api.service";

export const Company = () => {
  const params = useParams();
  const [data, setData] = useState(undefined);
  const getData = async () => {
    try {
      setData(undefined);
      let response = await APIservice.getCompany(params.BOMcode);
      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [params]);
  useEffect(() => {}, [data]);
  return (
    <div>
      {data ? <Canvas data={data} /> : <LinearProgress color="secondary" />}
    </div>
  );
};
