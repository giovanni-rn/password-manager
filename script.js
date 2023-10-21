"use strict";
const d = this.document;
// Login form
const username = d.querySelector("#username");
const signup = d.querySelector("#signup");
const login = d.querySelector("#login");
// Add form
const website = d.querySelector("#website");
const password = d.querySelector("#password");
const save = d.querySelector("#save");
// Passwords list
const passList = d.querySelector("#password-list");
// Data storage
const initialUsers = ["nono", "bob", "poulet"];
const users = new Set(initialUsers);
const savedPass = new Map([
    [
        "nono",
        new Map([
            ["youtube.com", "bvyu67F"],
            ["stripe.com", "bcdiusvuU56D76D"],
            ["github.com", "vvuky67FIUFCTRU"],
        ]),
    ],
    [
        "bob",
        new Map([
            ["facebook.com", "bvyu67F"],
            ["paypal.com", "bcdiusvuU56D76D"],
            ["github.com", "vvuky67FIUFCTRU"],
        ]),
    ],
    [
        "poulet",
        new Map([
            ["twitter.com", "bvyu67F"],
            ["wikipedia.org", "bcdiusvuU56D76D"],
            ["oriano.dev", "vvuky67FIUFCTRU"],
        ]),
    ],
]);
savedPass.forEach((pass, user) => pass.forEach((pass, url) => console.log(url)));
// Simulate UX
username.value = "Nono";
website.value = "youtube.com";
password.value = "fcyh576FDyfx";
let curentUser = "bob";
const log = (iterable) => iterable.forEach((v) => console.log(v));
const signupUser = (e) => {
    e.preventDefault();
    if (username.value === "")
        return console.log("Please enter your username.");
    const initialSize = users.size;
    const newUser = username.value;
    users.add(newUser);
    if (users.size === initialSize)
        return console.log("User already exists, login instead.");
    else {
        users.add(newUser);
        curentUser = username.value.trim().toLowerCase();
        reRenderPasswordList();
        return log(users);
    }
};
const loginUser = (e) => {
    e.preventDefault();
    if (users.has(username.value.trim().toLowerCase())) {
        curentUser = username.value.trim().toLowerCase();
        reRenderPasswordList();
    }
    else
        return console.log("This user does not exist, sign up instead.");
};
const reRenderPasswordList = () => {
    passList.innerHTML = "";
    savedPass.forEach((v, k) => {
        if (k === curentUser)
            v.forEach((v, k) => {
                const newListElem = d.createElement("li");
                newListElem.innerHTML = `<strong>${k}</strong> | <del>${v}</del>`;
                passList.appendChild(newListElem);
            });
    });
    d.createElement("li");
};
// Event listeners
signup.onclick = (e) => signupUser(e);
login.onclick = (e) => loginUser(e);
// Check output
console.log(" ");
