// Types and Interfaces
type Input = HTMLInputElement;
type Button = HTMLButtonElement;
type List = HTMLUListElement;
const d: Document = this.document;

// Login form
const username: Input = d.querySelector("#username") as HTMLInputElement;
const signup: Button = d.querySelector("#signup") as HTMLButtonElement;
const login: Button = d.querySelector("#login") as HTMLButtonElement;
// Add form
const website: Input = d.querySelector("#website") as HTMLInputElement;
const password: Input = d.querySelector("#password") as HTMLInputElement;
const save: Button = d.querySelector("#save") as HTMLButtonElement;
// Passwords list
const passList: List = d.querySelector("#password-list") as HTMLUListElement;

// Data storage
const initialUsers = ["nono", "bob", "poulet"];
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

savedPass.forEach((pass: Password, user: string) =>
  pass.forEach((pass: string, url: string) => console.log(url))
);

// Simulate UX
username.value = "Nono";
website.value = "youtube.com";
password.value = "fcyh576FDyfx";

let curentUser: string = "bob";

const log = (iterable: Array<any> | Set<any> | Map<any, any>): void =>
  iterable.forEach((v: any) => console.log(v));

const signupUser = (e: Event): void => {
  e.preventDefault();
  if (username.value === "") return console.log("Please enter your username.");
  const initialSize: number = users.size;
  const newUser: string = username.value;
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

const loginUser = (e: Event): void => {
  e.preventDefault();
  if (users.has(username.value.trim().toLowerCase())) {
    curentUser = username.value.trim().toLowerCase();
    reRenderPasswordList();
  } else return console.log("This user does not exist, sign up instead.");
};

const reRenderPasswordList = (): void => {
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
signup.onclick = (e: Event) => signupUser(e);
login.onclick = (e: Event) => loginUser(e);

// Check output
console.log(" ");
