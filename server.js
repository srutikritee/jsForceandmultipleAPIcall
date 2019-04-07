const jsforce = require("jsforce");
const conn = new jsforce.Connection();
conn.login("email", "passwordsecuritytoken", function(err, res) {
  if (err) {
    return console.error(err);
  }
  // conn.query("SELECT name FROM Account", function(err, res) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log(res);
  // });

  conn
    .sobject("Pharma_Products__c")
    .create({ Name: "My AusingSOQL", Price__c: 300 }, function(err, ret) {
      if (err || !ret.success) {
        return console.error(err, ret);
      }
      console.log("Created record id : " + ret.id);
      // ...
    });
});
