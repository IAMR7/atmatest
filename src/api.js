import axios from "axios";
import { config } from "./config";

var baseurl = config.API_URL;
var token = "";

// var baseurl = "https://dummyjson.com";

export const api = {
  postApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + token,
    },
    method: "post",
  }),
  postFileApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Basic " + token,
    },
    method: "post",
  }),
  putFileApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Basic " + token,
    },
    method: "post",
  }),
  getApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "get",
    Authorization: "Basic " + token,
  }),
  putApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + token,
    },
    method: "put",
  }),
  delApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + token,
    },
    method: "delete",
  }),
  patchApi: axios.create({
    baseURL: baseurl,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + token,
    },
    method: "patch",
  }),
};
