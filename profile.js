// ===== 1. Elements =====
const profileForm = document.getElementById("profileForm");
const formMessage = document.getElementById("formMessage");
const studentList = document.getElementById("studentList");

const fullName        = document.getElementById("fullName");
const regNo           = document.getElementById("regNo");
const email           = document.getElementById("email");
const department      = document.getElementById("department");
const semester        = document.getElementById("semester");
const phone           = document.getElementById("phone");
const password        = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// ===== 2. Patterns =====
const REG_PATTERN   = /^\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^03\d{9}$/;
const NAME_PATTERN  = /^[A-Za-z ]{3,}$/;

// ===== 3. Error helpers =====
function setError(input, message) {
  document.getElementById(input.id + "Error").textContent = message;
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function setValid(input) {
  document.getElementById(input.id + "Error").textContent = "";
  input.classList.remove("invalid");
  input.classList.add("valid");
}

// ===== 4. Validations =====
function validateName() {
  const value = fullName.value.trim();
  if (value === "") { setError(fullName, "Full name is required."); return false; }
  if (!NAME_PATTERN.test(value)) { setError(fullName, "Use letters only (minimum 3 characters)."); return false; }
  setValid(fullName);
  return true;
}

function validateRegNo() {
  const value = regNo.value.trim();
  if (value === "") { setError(regNo, "Registration number is required."); return false; }
  if (!REG_PATTERN.test(value)) { setError(regNo, "Registration number must be exactly 9 digits."); return false; }
  setValid(regNo);
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  if (value === "") { setError(email, "Email is required."); return false; }
  if (!EMAIL_PATTERN.test(value)) { setError(email, "Please enter a valid email address."); return false; }
  setValid(email);
  return true;
}

function validateDepartment() {
  if (department.value === "") { setError(department, "Please select your department."); return false; }
  setValid(department);
  return true;
}

function validateSemester() {
  if (semester.value === "") { setError(semester, "Please select your semester."); return false; }
  setValid(semester);
  return true;
}

function validatePhone() {
  const value = phone.value.trim();
  if (value === "") { setError(phone, "Phone number is required."); return false; }
  if (!PHONE_PATTERN.test(value)) { setError(phone, "Enter 11 digits starting with 03 (e.g. 03001234567)."); return false; }
  setValid(phone);
  return true;
}

function validatePassword() {
  const value = password.value;
  if (value === "") { setError(password, "Password is required."); return false; }
  if (value.length < 8) { setError(password, "Password must be at least 8 characters."); return false; }
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    setError(password, "Password must contain both letters and numbers.");
    return false;
  }
  setValid(password);
  return true;
}

function validateConfirmPassword() {
  if (confirmPassword.value === "") { setError(confirmPassword, "Please confirm your password."); return false; }
  if (confirmPassword.value !== password.value) { setError(confirmPassword, "Passwords do not match."); return false; }
  setValid(confirmPassword);
  return true;
}

// ===== 5. Live validation =====
fullName.addEventListener("blur", validateName);
regNo.addEventListener("blur", validateRegNo);
email.addEventListener("blur", validateEmail);
department.addEventListener("change", validateDepartment);
semester.addEventListener("change", validateSemester);
phone.addEventListener("blur", validatePhone);
password.addEventListener("blur", validatePassword);
confirmPassword.addEventListener("blur", validateConfirmPassword);

// ===== 6. Registered students dikhana =====
function showStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  studentList.innerHTML = "";

  if (students.length === 0) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "No students registered yet.";
    studentList.appendChild(empty);
    return;
  }

  students.forEach(function (student) {
    const card = document.createElement("div");
    card.className = "card student-card";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = student.name.charAt(0).toUpperCase();

    const info = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = student.name;

    const line1 = document.createElement("p");
    line1.textContent = "Reg# " + student.regNo;

    const line2 = document.createElement("p");
    line2.textContent = student.department + " | Semester " + student.semester;

    const line3 = document.createElement("p");
    line3.className = "muted";
    line3.textContent = student.email;

    info.appendChild(name);
    info.appendChild(line1);
    info.appendChild(line2);
    info.appendChild(line3);
    card.appendChild(avatar);
    card.appendChild(info);
    studentList.appendChild(card);
  });
}

// ===== 7. Submit =====
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const results = [
    validateName(),
    validateRegNo(),
    validateEmail(),
    validateDepartment(),
    validateSemester(),
    validatePhone(),
    validatePassword(),
    validateConfirmPassword()
  ];

  const allValid = results.every(function (r) { return r === true; });

  if (!allValid) {
    formMessage.textContent = "Please fix the errors above and try again.";
    formMessage.className = "message error";
    return;
  }

  const students = JSON.parse(localStorage.getItem("students")) || [];
  const regValue = regNo.value.trim();

  const alreadyExists = students.some(function (s) { return s.regNo === regValue; });
  if (alreadyExists) {
    setError(regNo, "This registration number is already registered.");
    formMessage.textContent = "Registration failed: duplicate registration number.";
    formMessage.className = "message error";
    return;
  }

  // Password save nahi karte (security ke liye)
  students.push({
    name: fullName.value.trim(),
    regNo: regValue,
    email: email.value.trim(),
    department: department.value,
    semester: semester.value,
    phone: phone.value.trim()
  });
  localStorage.setItem("students", JSON.stringify(students));

  formMessage.textContent = "Registration successful! Welcome, " + fullName.value.trim() + ".";
  formMessage.className = "message success";
  profileForm.reset();

  document.querySelectorAll("#profileForm input, #profileForm select").forEach(function (el) {
    el.classList.remove("valid", "invalid");
  });

  showStudents();
});

// Page khulte hi saved students dikhao
showStudents();