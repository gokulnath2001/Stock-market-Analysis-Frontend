import React, { useEffect, useState } from "react";
import CanvasJSReact from "./canvasjs.stock.react";

const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
export const Canvas = (props) => {
  const [dataPoints, setDatapoints] = useState({
    dataPoints1: [],
    dataPoints2: [],
    dataPoints3: [],
    isLoaded: false,
    start_date: "",
    end_date: "",
  });
  const getData = async () => {
    const data = props.data.data;
    var dps1 = [],
      dps2 = [],
      dps3 = [];
    for (var i = 0; i < data.length; i++) {
      dps1.push({
        x: new Date(data[i][0]),
        y: [
          Number(data[i][1]),
          Number(data[i][2]),
          Number(data[i][3]),
          Number(data[i][4]),
        ],
      });
      dps2.push({ x: new Date(data[i][0]), y: Number(data[i][8]) });
      dps3.push({ x: new Date(data[i][0]), y: Number(data[i][4]) });
    }
    setDatapoints({
      isLoaded: true,
      dataPoints1: dps1,
      dataPoints2: dps2,
      dataPoints3: dps3,
      start_date: props.data.oldest_available_date,
      end_date: props.data.newest_available_date,
      company: props.data.name,
    });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const options = {
    theme: "light2",
    title: {
      text: `${dataPoints.company} StockChart Analysis`,
    },
    subtitles: [
      {
        text: "Price vs Total Turnover",
      },
    ],
    charts: [
      {
        axisX: {
          lineThickness: 5,
          tickLength: 0,
          labelFormatter: function (e) {
            return "";
          },
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
            labelFormatter: function (e) {
              return "";
            },
          },
        },
        axisY: {
          title: "Stock Price",
          prefix: "Rs",
          tickLength: 0,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Price",
            yValueFormatString: "Rs##,###.##",
            type: "candlestick",
            dataPoints: dataPoints.dataPoints1,
          },
        ],
      },
      {
        height: 100,
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true,
          },
        },
        axisY: {
          title: "Total Turnover",
          prefix: "Rs",
          tickLength: 0,
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            name: "Total Turnover",
            yValueFormatString: "Rs##,###.##",
            type: "column",
            dataPoints: dataPoints.dataPoints2,
          },
        ],
      },
    ],
    navigator: {
      data: [
        {
          dataPoints: dataPoints.dataPoints3,
        },
      ],
      slider: {
        minimum: new Date("2020-05-01"),
        maximum: new Date("2020-07-01"),
      },
    },
  };
  const containerProps = {
    width: "80%",
    height: "450px",
    margin: "30px auto 0",
  };
  return (
    <div>
      <div>
        {dataPoints.isLoaded && (
          <CanvasJSStockChart
            containerProps={containerProps}
            options={options}
          />
        )}
      </div>
    </div>
  );
};
