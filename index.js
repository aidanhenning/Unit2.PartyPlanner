/**
 * @typedef Event
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 * @property {string} cohortId
 */

// === Constants ===
const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2504-FTB-ET-WEB-FT/events";

// === State ===
let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    events = json.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getEventById(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedEvent = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

// === Components ===
function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = `<a href="#selected">${event.name}</a>`;
  $li.addEventListener("click", () => getEventById(event.id));
  return $li;
}

function EventList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);
  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("event");
  $event.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <br>
    <p>${selectedEvent.date}</p>
    <address>${selectedEvent.location}</address>
    <br>
    <p>${selectedEvent.description}</p>
    `;
  return $event;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Party Planner</h1>
      <main>
        <section>
          <h2>Upcoming Parties</h2>
          <EventList></EventList>
        </section>
        <section id="selected">
          <h2>Party Details</h2>
          <PartyDetails></PartyDetails>
        </section>
      </main>
    `;
  $app.querySelector("EventList").replaceWith(EventList());
  $app.querySelector("PartyDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();

/*
REQUIREMENTS

index.html is not modified. All elements are generated via JS.

The application updates state by fetching an array of parties from the API.

The application renders a list of party names.

When a party name is clicked on, the application updates state by fetching information about a single party from the API.

The application renders the name, ID, date, description, and location of the selected party.

The application renders a message telling users to select a party if none is selected.

Functions are used to organize logic involving state changes.

The application is rerendered whenever state changes.

UI elements are organized into component functions.

All thrown errors are explicitly caught with a try...catch statement.
*/
