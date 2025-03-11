const partyList = document.getElementById('party-list');
const addPartyForm = document.getElementById('add-party-form');

// Fetch party data from API
function fetchParties() {
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/events') 
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                renderParties(data.data);  // Use the 'data' property from the API response
            } else {
                console.error('Failed to fetch parties:', data.error);
            }
        })
        .catch(error => console.error('Error fetching parties:', error));
}

// Render the list of parties
function renderParties(parties) {
    partyList.innerHTML = '';  // Clear the list
    parties.forEach(party => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${party.name}</strong> on ${new Date(party.date).toLocaleDateString()} at ${new Date(party.date).toLocaleTimeString()},
            Location: ${party.location} - ${party.description}
            <button class="delete-btn" data-id="${party.id}">Delete</button>
        `;
        partyList.appendChild(li);

        // Add event listener for the delete button
        li.querySelector('.delete-btn').addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id');
            deleteParty(id);
        });
    });
}

// Add a new party via POST
addPartyForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newParty = {
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    // POST the new party to the API
    fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParty),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchParties();  // Re-fetch the list of parties after adding the new one
        } else {
            console.error('Failed to add new party:', data.error);
        }
    })
    .catch(error => console.error('Error adding new party:', error));
});

// Delete a party via DELETE
function deleteParty(id) {
    fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2502-FTB-ET-WEB-FT/events${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchParties();  // Re-fetch the list of parties after deletion
        } else {
            console.error('Failed to delete party:', data.error);
        }
    })
    .catch(error => console.error('Error deleting party:', error));
}

// Initial fetch of party data when the page loads
document.addEventListener('DOMContentLoaded', fetchParties);