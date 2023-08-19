import axios from 'axios';

// const baseURL = process.env.NODE_ENV === "development"
//   ? "http://localhost:3001/"
//   : "http://example.com"
// axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: 'http://localhost:8800/api', // Replace this with your server URL
  withCredentials: true
});

// instance.defaults.withCredentials = true;

export default instance;
