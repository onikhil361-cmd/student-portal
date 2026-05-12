const fs= require("fs-extra")
 const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let users = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { error: "" });
});

app.post("/submit", async (req, res) => {

    const { name, email, age } = req.body;

    if(!name || !email || !age){

        return res.render("index", {
            error: "All fields required"
        });
    }

    if(age < 18){

        return res.render("index", {
            error: "Age must be 18+"
        });
    }

    let users = await fs.readJson("data.json");

    users.push({
        name,
        email,
        age
    });

    await fs.writeJson("data.json", users);

    res.redirect("/users");

});
app.get("/users", async (req, res) => {

    const users = await fs.readJson("data.json");

    res.render("users", { users });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});