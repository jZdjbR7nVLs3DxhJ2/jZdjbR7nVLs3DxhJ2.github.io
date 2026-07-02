/* ==========================================
   Joshua Halpin Portfolio
   script.js
========================================== */

/* ========= ELEMENTS ========= */

const nav = document.getElementById("myNav");
const menuIcon = document.querySelector(".menu-icon");

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

const topBtn = document.getElementById("myBtn");
const scrollBar = document.getElementById("scrollBar");
const themeBtn = document.getElementById("toggleButton");


/* ==========================================
   MOBILE MENU
========================================== */

function toggleMenu(icon) {
    if (!nav) return;

    nav.classList.toggle("open");
    icon.classList.toggle("change");
}

// Close menu when clicking a link
document.querySelectorAll(".overlay-content a").forEach(link => {
    link.addEventListener("click", () => {
        nav?.classList.remove("open");
        menuIcon?.classList.remove("change");
    });
});

// Close menu by clicking outside
nav?.addEventListener("click", (e) => {
    if (e.target === nav) {
        nav.classList.remove("open");
        menuIcon?.classList.remove("change");
    }
});


/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();
        });

    });


/* ==========================================
   MODAL
========================================== */

function openModal(el) {

    if (!modal) return;

    const img = el.querySelector("img");
    const video = el.querySelector("video");

    modalImg.style.display = "none";
    modalVideo.style.display = "none";

    modalImg.src = "";
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";

    if (img) {

        modalImg.src = img.src;
        modalImg.style.display = "block";

        modalTitle.textContent = img.dataset.title || "";
        modalDesc.textContent = img.dataset.desc || "";

    }

    if (video) {
        const source = video.querySelector("source");

        if (source) {
            modalVideo.src = source.src;
        }

        modalVideo.style.display = "block";
        modalVideo.loop = true;
        modalVideo.muted = true;
        modalVideo.playsInline = true;
        modalVideo.load();

        modalVideo.play().catch(() => {});
    }

        modal.classList.add("open");

    }

function closeModal() {

    modal?.classList.remove("open");

    modalImg.src = "";
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";

}

modal?.addEventListener("click", (e) => {

    if (e.target === modal) {
        closeModal();
    }

});


/* ==========================================
   VIDEO HOVER PLAY
========================================== */

document.querySelectorAll(".portfolio-item").forEach(item => {

    const video = item.querySelector("video");

    if (!video) return;

    item.addEventListener("mouseenter", () => {
        video.play().catch(() => {});
    });

    item.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });

});


/* ==========================================
   ACHIEVEMENT DROPDOWNS
========================================== */

document.querySelectorAll(".achievement-toggle").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.parentElement;

        card.classList.toggle("open");

    });

});


/* ==========================================
   BACK TO TOP BUTTON
========================================== */

function topFunction() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

window.addEventListener("scroll", () => {

    if (!topBtn) return;

    if (window.scrollY > 300) {
        topBtn.classList.add("show");
    } else {
        topBtn.classList.remove("show");
    }

});


/* ==========================================
   SCROLL PROGRESS BAR
========================================== */

function updateScrollProgress() {

    if (!scrollBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / height) * 100;

    scrollBar.style.width = progress + "%";

}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);


/* ==========================================
   DARK MODE
========================================== */

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

function updateThemeButton() {

    if (!themeBtn) return;

    const text = themeBtn.querySelector(".btn-text");
    const icon = themeBtn.querySelector(".btn-icon");

    const dark = document.body.classList.contains("dark-mode");

    if (text) text.textContent = dark ? "Dark Mode" : "Light Mode";
    if (icon) icon.textContent = dark ? "🌙" : "☀️";

}

updateThemeButton();

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode")
            ? "dark"
            : "light"
    );

    updateThemeButton();

});


/* ==========================================
   WEATHER (Contact Page Only)
========================================== */

const weather = document.getElementById("weather-result");

if (weather) {

    const latitude = -34.425072;
    const longitude = 150.893143;

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`)
        .then(r => r.json())
        .then(data => {

            weather.innerHTML = `
                <p>🌡️ Temperature: ${data.current.temperature_2m}°C</p>
                <p>💨 Wind Speed: ${data.current.wind_speed_10m} km/h</p>
            `;

        })
        .catch(() => {

            weather.innerHTML = "Unable to load weather.";

        });

}


/* ==========================================
   ESC KEY
========================================== */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeModal();

        nav?.classList.remove("open");
        menuIcon?.classList.remove("change");

    }

});

/* ==========================================
    Hero Typing Anim
========================================== */

const words = [
    "Software Developer...",
    "Web Designer...",
    "3D Artist...",
    "Problem Solver..."
];

const typedText = document.getElementById("typed-text");

if (typedText) {

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = words[wordIndex];

        if (!deleting) {
            typedText.textContent = current.substring(0, charIndex++);
        } else {
            typedText.textContent = current.substring(0, charIndex--);
        }

        let speed = deleting ? 50 : 90;

        if (!deleting && charIndex === current.length + 1) {
            deleting = true;
            speed = 1800;
        }

        if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(type, speed);
    }

    type();
}


/* ==========================================
    Reveal as Scroll
========================================== */

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            
            if (entry.isIntersecting) {
                // scrolling down into view → show
                entry.target.classList.add("show");
                entry.target.classList.remove("reveal");
            } else {
                // scrolled back up / out of view → hide again
                entry.target.classList.remove("show");
                entry.target.classList.add("reveal");
            }

        });
    },
    {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px"
    }
);

sections.forEach(section => {
    section.classList.add("reveal");
    observer.observe(section);
});