import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  //baseURL: "http://neverleave0916.com:34566/api",
  headers: {
    "Content-type": "application/json"
  }
});