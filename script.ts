// Types and Interfaces
type Input = HTMLInputElement;
type Button = HTMLButtonElement;
type List = HTMLUListElement;
type Span = HTMLSpanElement;
type ListItem = HTMLLIElement;
const d: Document = this.document;

// Login form
const username: Input = d.querySelector("#username") as Input;
const signup: Button = d.querySelector("#signup") as Button;
const login: Button = d.querySelector("#login") as Button;
// Add form
const website: Input = d.querySelector("#website") as Input;
const password: Input = d.querySelector("#password") as Input;
const save: Button = d.querySelector("#save") as Button;
// Passwords list
const passList: List = d.querySelector("#password-list") as List;
const currentUserText: Span = d.querySelector("#current-session") as Span;

// Data storage
const initialUsers: string[] = ["nono", "bob", "poulet"];
const users: Set<string> = new Set(initialUsers);

type Password = Map<string, string>; // [["url.com", "A"]...]
type SavedPass = Map<string, Password>; // [["user", [["url.com", "A"]...], ...]

const savedPass: SavedPass = new Map([
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

let currentUser: string;

// Simulate UX
// username.value = "Nono";
// website.value = "youtube.com";
// password.value = "fcyh576FDyfx";

/** Removes white spaces around string and set all letters to lower case. */
const sanitize = (value: string): string => value.trim().toLowerCase();

/** Add the user to users Set, and change the current user to print his saved passwords. */
const signupUser = (e: Event): void => {
  e.preventDefault();
  if (username.value === "") return alert("Please enter your username.");
  const initialSize: number = users.size;
  const newUser: string = sanitize(username.value);
  users.add(newUser);
  if (users.size === initialSize)
    return alert("User already exists, login instead.");
  else {
    currentUser = sanitize(username.value);
    const newEmptyRecords: Password = new Map([]);
    savedPass.set(currentUser, newEmptyRecords);
    renderPasswordList();
    currentUserText.innerText = currentUser;
  }
};

/** Change the current user and print his saved passwords. */
const loginUser = (e: Event): void => {
  e.preventDefault();
  if (username.value === "") return alert("Please enter your username.");
  if (users.has(sanitize(username.value))) {
    currentUser = sanitize(username.value);
    renderPasswordList();
    currentUserText.innerText = currentUser.toLowerCase();
  } else return alert("This user does not exist, sign up instead.");
};

/** Iterate through the Password Map to print the website/password pairs. */
const renderPasswordList = (): void => {
  if (currentUser !== "" && currentUserText.innerText !== "") {
    passList.innerHTML = "";
    savedPass.forEach((v, k) => {
      if (k === sanitize(currentUser))
        v.forEach((v, k) => {
          const newListElem: ListItem = d.createElement("li");
          newListElem.innerHTML = `<strong>${k}</strong> | <del>${v}</del>`;
          passList.appendChild(newListElem);
        });
    });
  }
  const listEmpty: ListItem = d.createElement("li");
  listEmpty.innerHTML = "None";
  if (passList.innerHTML === "") passList.appendChild(listEmpty);
};

/** Add a website/password pair to the list associated with the current user. */
const addPassword = (e: Event): void => {
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
      savedPass.forEach((v: Password, k: String) => {
        if (k === currentUser) {
          const nbPasswords = v.size;
          v.set(sanitize(website.value), password.value);
          if (nbPasswords === v.size) alert("Password successfully updated.");
          else alert("Password successfully added.");
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
signup.onclick = (e: Event) => signupUser(e);
login.onclick = (e: Event) => loginUser(e);
save.onclick = (e: Event) => addPassword(e);
