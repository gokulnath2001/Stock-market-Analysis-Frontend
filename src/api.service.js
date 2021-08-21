import Axios from "axios";
import { backendURL, quandlURL, REACT_APP_QUANDL } from "./config";

export const APIservice = {
  async getCodes() {
    try {
      const response = await Axios.get(`${backendURL}/getCodes`, {
        "Access-Control-Allow-Origin": "*",
      });
      const { indices, stocks } = response.data;
      return { indices, stocks };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getCount() {
    try {
      const response = await Axios.get(`${backendURL}/getCount`, {
        "Access-Control-Allow-Origin": "*",
      });
      const { indexCount, stockCount } = response.data;
      return { indexCount, stockCount };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getIndices(skip) {
    try {
      skip = skip ? skip : "0";
      const response = await Axios.get(
        `${backendURL}/getIndices?skip=${skip}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = [];
      response.data.data.forEach((item) => {
        let { name, open, close, high, low } = item;
        let object = { name, open, close, high, low };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getTopGainers() {
    try {
      const response = await Axios.get(`${backendURL}/getStocks/topGainers`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = [];
      response.data.data.forEach((item) => {
        let { name, wap, high, low } = item;
        let object = { name, wap, high, low };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getTopLosers() {
    try {
      const response = await Axios.get(`${backendURL}/getStocks/topLosers`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = [];
      response.data.data.forEach((item) => {
        let { name, wap, high, low } = item;
        let object = { name, wap, high, low };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getMarketAction(skip) {
    try {
      skip = skip ? skip : "0";
      const response = await Axios.get(
        `${backendURL}/getStocks/marketAction?skip=${skip}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = [];
      response.data.data.forEach((item) => {
        let { name, open, close, shares, trades } = item;
        let object = { name, open, close, shares, trades };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getMostActive() {
    try {
      const response = await Axios.get(`${backendURL}/getStocks/mostActive`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = [];
      response.data.data.forEach((item) => {
        let { name, shares } = item;
        let object = { name, shares };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getUpwardPotential() {
    try {
      const response = await Axios.get(
        `${backendURL}/getStocks/upwardPotential`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const data = [];
      response.data.data.forEach((item) => {
        let { name, shares, turnover } = item;
        let object = { name, shares, turnover };
        data.push(object);
      });
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async createUser(user) {
    try {
      const response = await Axios.post(`${backendURL}/user`, user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async login(user) {
    try {
      const response = await Axios.post(`${backendURL}/login`, user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      throw new Error(error.message);
    }
  },
  async register(user) {
    try {
      const response = await Axios.post(`${backendURL}/user`, user, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getCompany(code) {
    try {
      const response = await Axios.get(
        `${quandlURL}/${code}.json?api_key=${REACT_APP_QUANDL}`
      );
      return response?.data?.dataset;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
