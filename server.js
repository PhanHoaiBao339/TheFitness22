let express = require("express");

let app = express();

app.use(express.static(__dirname + "/dist/web-fitness"));

app.get("/*", (req, resp) => {
  resp.sendFile(__dirname + "/dist/web-fitness/index.html");
});

app.listen(process.env.PORT || 8080);

