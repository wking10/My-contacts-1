// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById("go-btn");
let menuEl = document.getElementById("menu");
let outputEl = document.getElementById("output");

// GLobal variable
let contacts = loadContacts();

// Go Btn - Menu Listener
goBtnEl.addEventListener("click", goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === "display-all") {
    displayContacts();
  } else if (selection === "add") {
    addContact();
  } else if (selection === "remove") {
    removeContact();
  } else if (selection === "display-name") {
    displayByName();
  } else if (selection === "display-country") {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    outputStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outputStr;
}

function addContact() {
  let name = prompt("Enter  Contact Name");
  let email = prompt("Enter  Contact Email");
  let number = prompt("Enter  Contact Number");
  let country = prompt("Enter  Contact Country");
  let index = findByEmail(email);
  if (index === -1) {
    contacts.push(newContact(name, email, number, country));
    saveContacts();
    alert("New contact Added");
  } else {
    alert("Email is already in use");
  }
}

function removeContact() {
  let search = prompt("Enter email of contact:");
  let msg = "Invalid contact email";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === search) {
      // Valid Index -> Remove
      contacts.splice(i, 1);
      saveContacts();
      msg = "Contact removed";
    }
  }
  alert(msg);
}

function displayByName() {
  let search = prompt("Enter name");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name === search) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}

function displayByCountry() {
  console.log("Enter Country");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].country === search) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl, (innerHTML = outputStr);
}

function searchByEmail() {
  let search = prompt("Enter Email:");
  let outputStr = "";
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === search) {
      outputStr += getContactHTMLStr(contacts[i], i);
    }
  }
  outputEl.innerHTML = outputStr;
}

// HELPERS
function newContact(Name, Email, Number, Country) {
  return {
    name: Name,
    email: Email,
    number: Number,
    country: Country,
  };
}

// Get HTML for task
function getContactHTMLStr(contacts, i) {
  return `
    <div>
    ${i}; ${contacts.name} <br>
    ${contacts.email} <br>
    ${contacts.number} (${contacts.country})
    </div>
  `;
}

// Save tasks to local storage
function saveContacts() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Load tasks
function loadContacts() {
  let contactStr = localStorage.getItem("contacts");
  return JSON.parse(contactStr) ?? [];
}

function findByEmail(email) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email === email) {
      return i;
    }
  }
  return -1;
}
