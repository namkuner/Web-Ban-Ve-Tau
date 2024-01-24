//This file to test
const db = require("./models");
db.Trip.findAll().then(trips => {
    console.log("All trips:", JSON.stringify(trips, null, 4));
});
