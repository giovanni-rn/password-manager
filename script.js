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
const currentUserText = d.querySelector("#current-session");
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
let currentUser;
// Simulate UX
// username.value = "Nono";
// website.value = "youtube.com";
// password.value = "fcyh576FDyfx";
/** Removes white spaces around string and set all letters to lower case. */
const sanitize = (value) => value.trim().toLowerCase();
/** Add the user to users Set, and change the current user to print his saved passwords. */
const signupUser = (e) => {
    e.preventDefault();
    if (username.value === "")
        return alert("Please enter your username.");
    const initialSize = users.size;
    const newUser = sanitize(username.value);
    users.add(newUser);
    if (users.size === initialSize)
        return alert("User already exists, login instead.");
    else {
        currentUser = sanitize(username.value);
        const newEmptyRecords = new Map([]);
        savedPass.set(currentUser, newEmptyRecords);
        renderPasswordList();
        currentUserText.innerText = currentUser;
    }
};
/** Change the current user and print his saved passwords. */
const loginUser = (e) => {
    e.preventDefault();
    if (username.value === "")
        return alert("Please enter your username.");
    if (users.has(sanitize(username.value))) {
        currentUser = sanitize(username.value);
        renderPasswordList();
        currentUserText.innerText = currentUser.toLowerCase();
    }
    else
        return alert("This user does not exist, sign up instead.");
};
/** Iterate through the Password Map to print the website/password pairs. */
const renderPasswordList = () => {
    if (currentUser !== "" && currentUserText.innerText !== "") {
        passList.innerHTML = "";
        savedPass.forEach((v, k) => {
            if (k === sanitize(currentUser))
                v.forEach((v, k) => {
                    const newListElem = d.createElement("li");
                    newListElem.innerHTML = `<strong>${k}</strong> | <del>${v}</del>`;
                    passList.appendChild(newListElem);
                });
        });
    }
    const listEmpty = d.createElement("li");
    listEmpty.innerHTML = "None";
    if (passList.innerHTML === "")
        passList.appendChild(listEmpty);
};
/** Add a website/password pair to the list associated with the current user. */
const addPassword = (e) => {
    e.preventDefault();
    switch (true) {
        case currentUser === "" || currentUserText.innerText === "":
            alert("Please log in before adding a new record.");
            break;
        case password.value === "" || website.value === "":
            alert("Please fill both inputs.");
            break;
        case website.value.length < 4 || !website.value.includes("."):
            alert("Please provide a valid url.");
            break;
        case password.value.length < 8:
            alert("Please provide a longer password.");
            break;
        default:
            savedPass.forEach((v, k) => {
                if (k === currentUser) {
                    const nbPasswords = v.size;
                    v.set(sanitize(website.value), password.value);
                    if (nbPasswords === v.size)
                        alert("Password successfully updated.");
                    else
                        alert("Password successfully added.");
                    renderPasswordList();
                }
            });
            break;
    }
};
// Initial user
// currentUser = "bob";
// currentUserText.innerText = currentUser;
renderPasswordList();
// Event listeners
signup.onclick = (e) => signupUser(e);
login.onclick = (e) => loginUser(e);
save.onclick = (e) => addPassword(e);
