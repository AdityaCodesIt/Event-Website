document.addEventListener("DOMContentLoaded", () => {
    const user = localStorage.getItem("user");
    const navMenu = document.getElementById("navMenu");
    
    if (navMenu) {
        const li = document.createElement("li");
        if (user) {
            li.innerHTML = '<a href="#" id="logoutBtn">Logout</a>';
            navMenu.appendChild(li);
            
            document.getElementById("logoutBtn").addEventListener("click", (e) => {
                e.preventDefault();
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                alert("Logged out successfully");
                window.location.href = "login.html";
            });
        } else {
            li.innerHTML = '<a href="login.html">Login</a>';
            navMenu.appendChild(li);
        }

        // Close hamburger menu on mobile when the new link is clicked
        const newLink = li.querySelector('a');
        if (newLink) {
            newLink.addEventListener('click', () => {
                const hamburger = document.getElementById('hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) hamburger.classList.remove('active');
                }
            });
        }
    }
});
