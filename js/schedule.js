// ===== 1. Schedule data =====
const schedule = [
  { day: "Monday",    course: "Web Technology",          instructor: "Mr. Usman",  start: "09:00", end: "10:30", room: "Lab 2" },
  { day: "Monday",    course: "Database Systems",        instructor: "Ms. Ayesha", start: "11:00", end: "12:30", room: "Room 204" },
  { day: "Tuesday",   course: "HCI & Computer Graphics", instructor: "Dr. Farah",  start: "09:00", end: "10:30", room: "Room 105" },
  { day: "Wednesday", course: "Mobile App Development",  instructor: "Mr. Hamza",  start: "10:00", end: "11:30", room: "Lab 3" },
  { day: "Wednesday", course: "Web Technology",          instructor: "Mr. Usman",  start: "12:00", end: "01:30", room: "Lab 2" },
  { day: "Thursday",  course: "HCI & Computer Graphics", instructor: "Dr. Farah",  start: "11:00", end: "12:30", room: "Room 105" },
  { day: "Friday",    course: "Mobile App Development",  instructor: "Mr. Hamza",  start: "09:00", end: "10:30", room: "Lab 3" }
];

// ===== 2. Elements =====
const scheduleBody    = document.getElementById("scheduleBody");
const dayFilter       = document.getElementById("dayFilter");
const scheduleMessage = document.getElementById("scheduleMessage");

// ===== 3. Table rows banana =====
function displaySchedule(list) {
  scheduleBody.innerHTML = "";

  if (list.length === 0) {
    scheduleMessage.textContent = "No classes on this day.";
    return;
  }

  scheduleMessage.textContent = list.length + " class(es) found";

  list.forEach(function (item) {
    const row = document.createElement("tr");
    // data-label mobile par har cell ka naam dikhane ke kaam aata hai
    row.innerHTML =
      '<td data-label="Day">' + item.day + "</td>" +
      '<td data-label="Course"><strong>' + item.course + "</strong></td>" +
      '<td data-label="Instructor">' + item.instructor + "</td>" +
      '<td data-label="Start">' + item.start + "</td>" +
      '<td data-label="End">' + item.end + "</td>" +
      '<td data-label="Room / Lab">' + item.room + "</td>";
    scheduleBody.appendChild(row);
  });
}

// ===== 4. Day filter =====
dayFilter.addEventListener("change", function () {
  const selectedDay = dayFilter.value;

  if (selectedDay === "all") {
    displaySchedule(schedule);
  } else {
    const result = schedule.filter(function (item) {
      return item.day === selectedDay;
    });
    displaySchedule(result);
  }
});

// Page khulte hi poora schedule dikhao
displaySchedule(schedule);
