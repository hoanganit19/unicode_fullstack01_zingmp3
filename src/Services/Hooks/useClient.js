import React from "react";
import config from "../../Configs/Config.json";
import endpoint from "../../Configs/Endpoint.json";
const { SERVER_API } = config;

export default function useClient(serverApi = null) {
  //Nếu serverApi không được truyền đối số => lấy SERVER_API trong config
  serverApi = serverApi ?? SERVER_API;

  const client = {
    ...endpoint,
    callApi: async function (url, method, params = {}, body = {}) {
      if (Object.keys(params).length) {
        const searchQuery = new URLSearchParams(params).toString();
        url = url + "?" + searchQuery;
      }

      url = serverApi + url;
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };
      if (Object.keys(body).length) {
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      const data = await res.json();

      return {
        response: res,
        data: data,
      };
    },

    get: function (url, params = {}) {
      return this.callApi(url, "GET", params);
    },

    post: function (url, body, params) {
      return this.callApi(url, "POST", params, body);
    },

    put: function (url, body, params) {
      return this.callApi(url, "PUT", params, body);
    },

    patch: function (url, body, params) {
      return this.callApi(url, "PATCH", params, body);
    },

    delete: function (url, params) {
      return this.callApi(url, "DELETE", params);
    },
  };

  return client;
}

/*
Hàm async luôn trả về promise
*/
