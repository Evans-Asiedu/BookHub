import http from "./httpService";

//const apiEndpoint = http.apiURL;

export function getBooks(genre) {
  let randomStartIndex = Math.floor(Math.random() * 20) + 1;
  let maxNumber = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
  return http.get(
    `${genre}&startIndex=${randomStartIndex}&maxResults=${maxNumber.toString()}`
  );
}

export function getSearchBooks(query) {
  return http.get(`${query}`);
}
