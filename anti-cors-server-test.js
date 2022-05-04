const assert = require("assert").strict;
// const http = require("http");

/* ----------------- SETTINGS ------------------ */
// const baseURL = "http://localhost:3000/";

/* ----------------- FUNCTIONS ------------------ */
const it = async (description, callback) => {
  try {
    await callback();
    console.log(`Test "${description}": PASSED`);
  } catch (e) {
    console.log(`Test "${description}": FAILED`);
    process.exit(1);
  }
};

// const sendRequest = (url, method) => {
//   return new Promise((resolve, reject) => {
//     http[method](url, (res) => {
//       const { statusCode } = res;
//       let error;
//       if (statusCode < 200 || statusCode > 200) {
//         error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
//         res.resume();
//         return reject(error.message);
//       }
//       let rawData = "";
//       res.on("data", (chunk) => {
//         rawData += chunk;
//       });
//       res.on("end", () => {
//         try {
//           return resolve(rawData);
//         } catch (e) {
//           return reject(e.message);
//         }
//       });
//     }).on("error", (e) => {
//       return reject(e.message);
//     });
//   });
// };
//
// const getResponse = async (url, method) => {
//   let response;
//   try {
//     response = await sendRequest(url, method);
//   } catch (err) {
//     response = err.response;
//   }
//   return response;
// };

// TODO: delete after fix issue at getResponse or sendRequests
const getA = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve(5);
    }, 2000);
  });
};

/* ----------------- TESTS ------------------ */

it("Tests are working", async () => {
  assert.ok(5 < 7);
});

//TODO: delete after fix issue at getResponse or sendRequest
it("Tests are working", async () => {
  let a;
  a = await getA();
  assert.ok(a < 7);
});

//TODO: fix issue with Promise of getResponse or sendRequest (above test-Promise works fine)
// it("Cors is configured", async () => {
//   assert.ok(5 < 7);
//   const res = await getResponse(baseURL, "GET");
//   console.log("res: ", res);
//   assert.strictEqual(res.data.length, 0);
//   assert.strictEqual(res.status, 204);
// });
