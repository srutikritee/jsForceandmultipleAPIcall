// {
// 	"employee": {
// 		"userId":"rirani",
// 		"jobTitleName":"Developer",
// 		"firstName":"Romin",
// 		"lastName":"Irani",
// 		"preferredFullName":"Romin Irani",
// 		"employeeCode":"E1",
// 		"countryCode":"CA",
// 		"phoneNumber":"408-1234567",
// 		"emailAddress":"romin.k.irani@gmail.com"
// 	}
// }

const express = require("express");
const app = express();

const config = require("./config");
const request = require("request");

app.use(express.json());

app.post("/api/users", function(req, res) {
  // const countryCode = req.body.employee.countryCode;
  // console.log(countryCode);

  // const auth = "Basic " + new Buffer(config.username + ":" + config.password).toString("base64");

  let accessToken;
  let toeknType;
  let instantUrl;

  request.post(
    {
      url: "https://login.salesforce.com/services/oauth2/token",

      form: {
        grant_type: "password",
        client_id: "",
        client_secret: "",
        username: "",
        password: ""
      }
      // headers: {
      //     Authorization: auth
      // }
    },

    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
        res.send(response.body);
        const info = JSON.parse(body);
        console.log(info);
        accessToken = info.access_token;
        toeknType = info.token_type;
        instantUrl = info.instance_url;
        console.log(accessToken);
        console.log(toeknType);
        console.log(instantUrl);

        request.post(
          {
            url:
              instantUrl + "/services/data/v41.0/sobjects/Pharma_Products__c",
            json: true,
            body: {
              Name: "testAPIagain1",
              Price__c: 200
            },
            headers: {
              Authorization: toeknType + " " + accessToken
            }
          },

          function(error, response, body) {
            if (!error) {
              console.log(body);
              console.log(response.statusCode);
              // res.send(response.body);
            } else {
              console.log("the error is:" + error);
            }
          }
        );
      } else {
        console.log("the error is:" + error);
      }
    }
  );
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
