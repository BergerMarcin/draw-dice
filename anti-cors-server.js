/**
 * Start server:
 * `node anti-cors-server.js`
 * Test server:
 * `curl -i http://127.0.0.1:3000/`
 */

const http = require("http");

/*--------- SETTINGS -----------*/
const hostname = "127.0.0.1";
const port = 3000;
const diceUrl = "http://roll.diceapi.com/json/d6";

/*--------- HELPERS -----------*/
const getRequestForJson = (url) => {
  return new Promise((resolve, reject) => {
    //TODO: validate url
    http
      .get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        // Any 2xx status code signals a successful response but here we're only checking for 200.
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          error = new Error("Invalid content-type.\n" + `Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.error(error.message);
          // Consume response data to free up memory
          res.resume();
          return reject(error.message);
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
          console.log(`Got data from: ${url}`);
          console.log(`Got data - raw: ${rawData}`);
        });
        res.on("end", () => {
          // checking if response (i.e. rawData) is JSON object type
          try {
            console.log("Got data - parsed to object: ", JSON.parse(rawData));
            return resolve(rawData);
          } catch (e) {
            console.error(e.message);
            return reject(e.message);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
        return reject(e.message);
      });
  });
};

/*--------- SERVER -----------*/
let requestNumber = 0;

const server = http.createServer();

server.on("request", async (req, res) => {
  requestNumber++;
  console.log(`Request number ${requestNumber} at ${Date()}`);
  await getRequestForJson(diceUrl)
    .then((response) => {
      const body = response;
      res.statusCode = 200;
      res.setHeader("Content-Length", Buffer.byteLength(body));
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "content-type");
      res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, OPTIONS");
      res.end(body);
      console.log(`This server response: Status: ${res.statusCode}. Sent response: ${body}`);
    })
    .catch((errorMsg) => {
      const body = `Anti-CORS-Server get request no.: ${requestNumber}\nGetting data from wrong-CORS-setup-server was unavailable\nError at requesting of wrong-CORS-setup-server: ${errorMsg}`;
      res.statusCode = 503;
      res.setHeader("Content-Length", Buffer.byteLength(body));
      res.setHeader("Content-Type", "text/plain");
      res.end(body);
      console.error(`This server response: Status: ${res.statusCode}. Sent response: ${body}`);
    });
  console.log("--------------");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log("--------------");
});
