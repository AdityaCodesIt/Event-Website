const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                message: document.getElementById("message").value
            })

        });

        const data = await response.json();

        alert(data.message);

        form.reset();
    } catch (err) {
        console.error("Failed to send message:", err);
        alert("Failed to send message. Make sure the server is running.");
    }

});