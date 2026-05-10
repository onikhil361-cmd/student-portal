const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

let users = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index", { error: "" });
});

app.post("/submit", (req, res) => {

    const { name, email, age } = req.body;

    if (!name || !email || !age) {

        return res.render("index", {
            error: "All fields are required!"
        });
    }

    users.push({ name, email, age });

    res.redirect("/users");
});

app.get("/users", (req, res) => {
    res.render("users", { users });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});