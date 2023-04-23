const express = require("express");
var appUser = require("./Main/usermodule");
const app = express();
  
app.post("/post", (req, res) => {
    appUser.createUser()
    console.log("Connected to React");
    res.redirect("/");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));