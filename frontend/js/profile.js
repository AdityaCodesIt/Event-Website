const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please login first");

    window.location.href = "login.html";

} else {

    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;

}