const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {

        alert("Passwords do not match");
        return;

    }

    try {
        const response = await fetch("https://event-website-aoyw.onrender.com/api/auth/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                password
            })

        });

        const data = await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href = "login.html";

        }
    } catch (err) {
        console.error("Registration failed:", err);
        alert("Registration failed. Make sure the server is running.");
    }

});