const participants = [];

const form = document.getElementById("registration-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("tel");
const packageSelect = document.getElementById("package");
const agreementCheckbox = document.getElementById("agree-terms");
const errorEl = document.getElementById("error-message");
const successEl = document.getElementById("success-message");
const participantList = document.getElementById("registered-list");

function renderParticipants() {
    participantList.innerHTML = "";

    for (const p of participants) {
        const li = document.createElement("li");
        li.textContent = `${p.name}  - ${p.package}`;
        participantList.appendChild(li);
    }
}

function addParticipant(participant) {
    participants.push(participant);
    renderParticipants();
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); //penting untuk mencegah reload halaman

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const tel = phoneInput.value.trim();
    const package = packageSelect.value;
    const agreedTerms = agreementCheckbox.checked;

    if (!name || !email || !tel) {
        errorEl.textContent = "Name, email, and phone number are required.";
        successEl.textContent = "";
        return;
    }

    if (!email.includes("@")) {
        errorEl.textContent = "Please enter a valid email address.";
        successEl.textContent = "";
        return;
    }

    if (!tel.match(/^\d{10,15}$/)) {
        errorEl.textContent = "Please enter a valid phone number (10-15 digits).";
        successEl.textContent = "";
        return;
    }

    if (package === "") {
        errorEl.textContent = "Please select a package.";
        successEl.textContent = "";
        return;
    }

    if (!agreedTerms) {
        errorEl.textContent = "You must agree to the terms and conditions.";
        successEl.textContent = "";
        return;
    }

    errorEl.textContent = "";

    addParticipant({ name, package });

    form.reset();
    successEl.textContent = "Registration successful!";

    setTimeout(() => {
        successEl.textContent = "";
    }, 3000);
});

renderParticipants();