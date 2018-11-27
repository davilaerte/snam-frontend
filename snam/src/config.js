const BACKEND_URL = "http://localhost:3001";

export default function request(path, method, body, headers) {
  headers = new Headers(headers);
  return fetch(BACKEND_URL + path, {
    method,
    body: JSON.stringify(body),
    headers
  });
}

//Request example
// Add: import request from "../config";
/*const method = "GET";
    const path = "/page";
    request(path, method, undefined, {}).then(response => {
      if (response.ok)
        response.json().then(data => {
          console.log(data);
        });
      else console.log("Error!");
    });*/
