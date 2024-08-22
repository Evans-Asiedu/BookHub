import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl;

export function getBooks(genre) {
  return http.get(`${apiEndpoint}${genre}`);
}
