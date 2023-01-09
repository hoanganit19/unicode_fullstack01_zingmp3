import React from "react";
import config from "../../Configs/Config.json";
import endpoint from "../../Configs/Endpoint.json";
const { SERVER_API, SERVER_API_PRODUCTION } = config;

export default function useClient(serverApi = null) {
  //Nếu serverApi không được truyền đối số => lấy SERVER_API trong config

  serverApi =
    serverApi ?? process.env.NODE_ENV === "development"
      ? SERVER_API
      : SERVER_API_PRODUCTION;

  const client = {
    ...endpoint,
    callApi: async function (
      url,
      method,
      params = {},
      body = {},
      token = null
    ) {
      if (Object.keys(params).length) {
        const searchQuery = new URLSearchParams(params).toString();
        url = url + "?" + searchQuery;
      }

      url = serverApi + url;

      const headers = {
        "Content-Type": "application/json",
      };

      if (token !== null) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const options = {
        method: method,
        headers: headers,
      };
      if (Object.keys(body).length) {
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.status == 404) {
        window.location.href = "/404";
      }

      return {
        response: res,
        data: data,
      };
    },

    get: function (url, params = {}, token = null) {
      return this.callApi(url, "GET", params, {}, token);
    },

    post: function (url, body, params, token = null) {
      return this.callApi(url, "POST", params, body, token);
    },

    put: function (url, body, params, token = null) {
      return this.callApi(url, "PUT", params, body, token);
    },

    patch: function (url, body, params, token = null) {
      return this.callApi(url, "PATCH", params, body, token);
    },

    delete: function (url, params, token = null) {
      return this.callApi(url, "DELETE", params, {}, token);
    },
  };

  return client;
}

/*
Hàm async luôn trả về promise
*/
