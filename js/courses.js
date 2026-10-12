// Note: courses ka array ab data.js mein hai

// ===== 1. HTML elements pakadna =====
const courseList     = document.getElementById("courseList");
const searchInput    = document.getElementById("searchInput");
const semesterFilter = document.getElementById("semesterFilter");
const statusFilter   = document.getElementById("statusFilter");
const resultMessage  = document.getElementById("resultMessage");

// ===== 2. Cards dikhane wala function =====
function displayCourses(list) {
  courseList.innerHTML = "";

  if (list.length === 0) {
    resultMessage.textContent = "No matching course found.";
    return;
  }

  resultMessage.textContent = list.length + " course(s) found";

  list.forEach(function (course) {
    const card = document.createElement("div");
    card.className = "card course-card";
    card.innerHTML =
      '<span class="badge status-' + course.status.toLowerCase() + '">' + course.status + "</span>" +
      "<h3>" + course.name + "</h3>" +
      "<p><strong>" + course.code + "</strong></p>" +
      "<p>👨‍🏫 " + course.instructor + "</p>" +
      "<p>Credit Hours: " + course.credits + " | Semester: " + course.semester + "</p>";
    courseList.appendChild(card);
  });
}

// ===== 3. Search + Filter =====
function filterCourses() {
  const searchText = searchInput.value.toLowerCase().trim();
  const semester   = semesterFilter.value;
  const status     = statusFilter.value;

  const result = courses.filter(function (course) {
    const matchesSearch =
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    const matchesSemester = semester === "all" || course.semester === Number(semester);
    const matchesStatus   = status === "all" || course.status === status;

    return matchesSearch && matchesSemester && matchesStatus;
  });

  displayCourses(result);
}

// ===== 4. Events =====
searchInput.addEventListener("input", filterCourses);
semesterFilter.addEventListener("change", filterCourses);
statusFilter.addEventListener("change", filterCourses);

// Page khulte hi saare courses dikhao
displayCourses(courses);
