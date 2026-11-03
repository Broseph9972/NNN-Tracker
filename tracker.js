const STORAGE_KEY = "no-nap-november-2026";
const statuses = ["", "clear", "nap"];
const symbols = {
  "": "—",
  clear: "✓",
  nap: "×",
};

const daysElement = document.querySelector("#days");
const countElement = document.querySelector("#count");
const promptElement = document.querySelector("#prompt");
const resetButton = document.querySelector("#reset");

let savedStatuses = loadStatuses();

function loadStatuses() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.from({ length: 30 }, (_, index) =>
      statuses.includes(saved[index]) ? saved[index] : ""
    );
  } catch {
    return Array(30).fill("");
  }
}

function saveStatuses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStatuses));
}

function render() {
  daysElement.replaceChildren();

  savedStatuses.forEach((status, index) => {
    const day = document.createElement("button");
    day.className = "day";
    day.type = "button";
    day.dataset.index = index;
    day.setAttribute("aria-label", `November ${index + 1}: ${status || "not filled in"}`);
    day.innerHTML = `
      <span class="day__number">${index + 1}</span>
      <span class="day__status" aria-hidden="true">${symbols[status]}</span>
    `;
    day.addEventListener("click", () => {
      savedStatuses[index] = statuses[(statuses.indexOf(savedStatuses[index]) + 1) % statuses.length];
      saveStatuses();
      render();
    });
    daysElement.append(day);
  });

  const completed = savedStatuses.filter(Boolean).length;
  countElement.textContent = `${completed}/30`;
  const firstEmpty = savedStatuses.findIndex((status) => !status);
  promptElement.textContent = firstEmpty === -1
    ? "November is fully recorded."
    : `Please fill in day${firstEmpty === 0 ? "" : "s"} ${firstEmpty + 1}${firstEmpty === 0 ? "" : " onward"}.`;
}

resetButton.addEventListener("click", () => {
  if (window.confirm("Clear all November statuses?")) {
    savedStatuses = Array(30).fill("");
    saveStatuses();
    render();
  }
});

render();
