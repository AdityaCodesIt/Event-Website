const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");

async function loadEvents() {
    try {
        const response = await fetch("https://event-website-aoyw.onrender.com/api/events");
        const events = await response.json();

        eventList.innerHTML = "";

        if (events.length === 0) {
            eventList.innerHTML = "<p>No events found.</p>";
            return;
        }

        events.forEach(event => {
            eventList.innerHTML += `
<div class="event-card">
    <h3>${event.title}</h3>
    <p>${event.description}</p>
    <p><strong>Category:</strong> ${event.category}</p>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Time:</strong> ${event.time}</p>
    <p><strong>Location:</strong> ${event.location}</p>
    <p><strong>Organizer:</strong> ${event.organizer}</p>
    <button class="delete-btn" onclick="deleteEvent(${event.id})">
        Delete
    </button>
</div>
`;
        });
    } catch (err) {
        console.error("Failed to load events:", err);
        eventList.innerHTML = "<p>Failed to load events. Make sure the server is running.</p>";
    }
}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("https://event-website-aoyw.onrender.com/api/events", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },

            body: JSON.stringify({
                title: document.getElementById("eventName").value,
                description: document.getElementById("description").value,
                category: document.getElementById("category").value,
                date: document.getElementById("date").value,
                time: document.getElementById("time").value,
                location: document.getElementById("location").value,
                maxAttendees: document.getElementById("maxAttendees").value,
                organizer: document.getElementById("organizer").value
            })

        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            console.log(data);
            return;
        }

        alert("Event Created Successfully");

        form.reset();

        loadEvents();
    } catch (err) {
        console.error("Failed to create event:", err);
        alert("Failed to create event. Make sure the server is running.");
    }

});

async function deleteEvent(id) {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(`https://event-website-aoyw.onrender.com/api/events/${id}`, {

            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }

        });

        const data = await response.json();

        alert(data.message);

        loadEvents();
    } catch (err) {
        console.error("Failed to delete event:", err);
        alert("Failed to delete event. Make sure the server is running.");
    }

}

loadEvents();