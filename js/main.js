// ===== 1. Mobile menu =====
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {
  mainNav.classList.toggle("open");
});

// ===== 2. Dark / Light mode =====
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    themeToggle.textContent = "🌙";
  }
}

applyTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", function () {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// ===== 3. Announcements + Events data =====
const announcements = [
  { title: "Mid-Term Exams", description: "Mid-term exams start from 20 October.", date: "2026-10-20", category: "Examination" },
  { title: "Fee Submission", description: "Last date for fee submission is 15 October.", date: "2026-10-15", category: "General" },
  { title: "Web Tech Assignment", description: "Assignment 1 submission date is 12 October.", date: "2026-10-12", category: "Academic" },
  { title: "Sports Week", description: "Annual sports week begins next month.", date: "2026-11-02", category: "Event" }
];

const events = [
  { title: "Tech Seminar", date: "2026-10-18", place: "Auditorium" },
  { title: "Career Fair", date: "2026-10-25", place: "Main Hall" },
  { title: "Coding Competition", date: "2026-11-05", place: "Computer Lab" }
];

// ===== 4. Announcements (category filter ke saath) =====
function showAnnouncements(category) {
  const container = document.getElementById("announcementList");
  const message = document.getElementById("announcementMessage");
  if (!container) return;

  container.innerHTML = "";

  const filtered = announcements.filter(function (item) {
    return category === "all" || item.category === category;
  });

  if (filtered.length === 0) {
    message.textContent = "No announcements in this category.";
    return;
  }

  message.textContent = filtered.length + " announcement(s)";

  filtered.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<span class="badge">' + item.category + "</span>" +
      "<h3>" + item.title + "</h3>" +
      "<p>" + item.description + "</p>" +
      '<small class="muted">' + item.date + "</small>";
    container.appendChild(card);
  });
}

// ===== 5. Events =====
function showEvents() {
  const container = document.getElementById("eventList");
  if (!container) return;

  container.innerHTML = "";

  events.forEach(function (ev) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      "<h3>" + ev.title + "</h3>" +
      "<p>📅 " + ev.date + "</p>" +
      "<p>📍 " + ev.place + "</p>";
    container.appendChild(card);
  });
}

// ===== 6. Number count-up animation =====
function animateNumber(element, target, suffix) {
  suffix = suffix || "";
  const duration = 1000;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    element.textContent = Math.round(target * progress) + suffix;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

// ===== 7. Student banner (registered student dikhana) =====
function showStudentBanner(students) {
  const banner = document.getElementById("studentBanner");
  banner.innerHTML = "";
  banner.className = "student-banner";

  if (students.length === 0) {
    const text = document.createElement("p");
    text.innerHTML = '👋 No student registered yet. <a href="profile.html">Register here</a>';
    banner.appendChild(text);
    return;
  }

  const latest = students[students.length - 1];

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = latest.name.charAt(0).toUpperCase();

  const info = document.createElement("div");

  const name = document.createElement("h3");
  name.textContent = "Welcome, " + latest.name;

  const details = document.createElement("p");
  details.className = "muted";
  details.textContent =
    "Reg# " + latest.regNo + " | " + latest.department +
    " | Semester " + latest.semester +
    " | " + students.length + " student(s) registered";

  info.appendChild(name);
  info.appendChild(details);
  banner.appendChild(avatar);
  banner.appendChild(info);
}

// ===== 8. Student Dashboard =====
// Attendance sample data: apne asli numbers likh dein
const studentInfo = {
  defaultSemester: 5,
  classesAttended: 52,
  totalClasses: 60
};

function showDashboard() {
  const dashRegistered = document.getElementById("dashRegistered");
  if (!dashRegistered) return;       // sirf home page par chalega

  // Registered students localStorage se
  const students = JSON.parse(localStorage.getItem("students")) || [];
  showStudentBanner(students);

  // Course counts asli courses array se
  const registeredCount = courses.filter(function (c) { return c.status === "Registered"; }).length;
  const completedCount  = courses.filter(function (c) { return c.status === "Completed"; }).length;

  // Semester: registered student ka, warna default
  const latest = students[students.length - 1];
  const semester = latest ? Number(latest.semester) : studentInfo.defaultSemester;

  // Attendance percentage
  const attendancePercent = Math.round(
    (studentInfo.classesAttended / studentInfo.totalClasses) * 100
  );

  // Pending assignments task manager se
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const pendingCount = savedTasks.filter(function (t) { return !t.completed; }).length;

  // Numbers animation ke saath dikhao
  animateNumber(dashRegistered, registeredCount);
  animateNumber(document.getElementById("dashCompleted"), completedCount);
  animateNumber(document.getElementById("dashSemester"), semester);
  animateNumber(document.getElementById("dashAttendance"), attendancePercent, "%");
  animateNumber(document.getElementById("dashAssignments"), pendingCount);
  animateNumber(document.getElementById("dashEvents"), events.length);

  const attendanceEl = document.getElementById("dashAttendance");
  const attendanceNote = document.getElementById("dashAttendanceNote");
  if (attendancePercent >= 75) {
    attendanceEl.style.color = "#16a34a";
    attendanceNote.textContent = "Good standing";
  } else {
    attendanceEl.style.color = "#dc2626";
    attendanceNote.textContent = "Below 75%, attendance warning";
  }
}

// ===== 9. Sab chalao =====
const announcementFilter = document.getElementById("announcementFilter");
if (announcementFilter) {
  announcementFilter.addEventListener("change", function () {
    showAnnouncements(announcementFilter.value);
  });
}

showAnnouncements("all");
showEvents();
showDashboard();
// ===== 10. Scroll animation: sections scroll karne par ubhar kar aayein =====
const revealSections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);     // ek hi baar chale
      }
    });
  }, { threshold: 0.05 });

  revealSections.forEach(function (section) {
    section.classList.add("reveal");
    observer.observe(section);
  });
}
