import http from "./httpService";
import config from "../config.json";
import { getBooksData } from "./fakeBookService";

const apiEndpoint = config.apiUrl;

export function getBooks(genre) {
  let randomStartIndex = Math.floor(Math.random() * 20) + 1;
  let maxNumber = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
  // return http.get(
  //   `${apiEndpoint}${genre}&startIndex=${randomStartIndex}&maxResults=${maxNumber.toString()}`
  // );
  return getBooksData();
}

export function getSearchBooks(query) {
  // return http.get(`${apiEndpoint}${query}`);
  return getBooksData();
}
