const links = document.getElementById("nav-bar").getElementsByTagName("a");
for (let i = 0; i < links.length; i++) {
    if (links[i].href == window.location.href) {
        links[i].classList.add("active")
    }
}

const toggle = function() {
    const para = document.getElementById("nav-toggler");
    const navLinks = document.getElementById("nav-links");
    if (para.innerHTML == "&gt;&gt;") {
        para.innerHTML = "&lt;&lt";
        navLinks.classList.remove("hidden");
    } else {
        para.innerHTML = "&gt;&gt;";
        navLinks.classList.add("hidden");
    }
}