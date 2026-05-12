const express = require("express");
const path = require("path");
const fs = require("fs-extra");

const app = express();

const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    res.render("index", { error: null });

});

app.post("/submit", async (req, res) => {

    const { name, email, age } = req.body;

    if (!name || !email || !age) {

        return res.render("index", {
            error: "All fields are required"
        });

    }

    if (age < 18) {

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

app.post("/delete/:index", async (req, res) => {

    const users = await fs.readJson("data.json");

    users.splice(req.params.index, 1);

    await fs.writeJson("data.json", users);

    res.redirect("/users");

});

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});