import axios from "axios";
import Vue from "vue";

const api = axios.create({
  baseURL: process.env.API_HOST,
  // For future purpose
  // headers: {
  //   "Content-Type": "application/json; charset=utf-8",
  // },
});

// For future purpose (like for example JWT @ store)
// api.interceptors.request.use((config) => {
//   config.headers.common = { ...config.headers.common, ...store.getters.authHeader };
//   return config;
// });

api.simple = async function (method, resource, data = {}, callback = async () => true) {
  return new Promise((resolve, reject) => {
    let response;
    let error;
    this({ url: resource, method, data })
      .then((resp) => {
        response = resp;
      })
      .catch((err) => {
        error = err;
      })
      .finally(async () => {
        await callback(error, response);
        if (error) reject(error);
        if (response)
          if (!response.error) resolve(response);
          else reject("Error of endpoint @ resolving data");
      });
  });
};

Vue.prototype.$api = api;

export default api;
