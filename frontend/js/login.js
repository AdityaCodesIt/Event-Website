const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = form.email.value;
    const password = form.password.value;

    try {
        const response = await fetch("https://event-website-aoyw.onrender.com/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if (!response.ok) {

            alert(data.message);
            return;

        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login Successful");

        window.location.href = "index.html";
    } catch (err) {
        console.error("Login failed:", err);
        alert("Login failed. Make sure the server is running.");
    }

});