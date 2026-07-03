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

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


function openModal(el) {

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");

    if (!modal || !modalImg || !modalVideo) {
        console.error("Modal elements missing");
        return;
    }

    const img = el.querySelector("img");
    const video = el.querySelector("video");

    // RESET
    modalImg.style.display = "none";
    modalVideo.style.display = "none";

    modalImg.src = "";
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
    modalVideo.load();

    // TEXT (safe fallback)
    modalTitle.textContent = el.dataset.title || "";
    modalDesc.textContent = el.dataset.desc || "";

    // IMAGE
    if (img) {
        modalImg.src = img.src;
        modalImg.style.display = "block";
    }

    // VIDEO
    if (video) {
        const source = video.querySelector("source");
        const videoSrc = source ? source.src : video.src;

        modalVideo.src = videoSrc;
        modalVideo.style.display = "block";

        modalVideo.loop = true;
        modalVideo.muted = true;

        modalVideo.load();
        modalVideo.play().catch(console.log);
    }

    modal.classList.add("open");
}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal() {

    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalVideo = document.getElementById("modalVideo");

    modal?.classList.remove("open");

    modalImg.src = "";

    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute("src");
    modalVideo.load();
}


/* ==========================================
   CLICK OUTSIDE TO CLOSE
========================================== */

document.addEventListener("click", (e) => {
    const modal = document.getElementById("imageModal");

    if (e.target === modal) {
        closeModal();
    }
});


/* ==========================================
   ESC KEY CLOSE
========================================== */

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.getElementById("imageModal");
        if (modal && modal.classList.contains("open")) {
            closeModal();
        }
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

    // Wollongong CBD
    const latitude = -34.4278;
    const longitude = 150.8931;

    fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&timezone=Australia/Sydney`
    )
    .then(response => response.json())
    .then(data => {

        const current = data.current;

        weather.innerHTML = `
            <p>🌤️ <strong>Current Weather - Wollongong</strong></p>
            <p>🌡️ Temperature: ${current.temperature_2m}°C</p>
            <p>🤗 Feels Like: ${current.apparent_temperature}°C</p>
            <p>💧 Humidity: ${current.relative_humidity_2m}%</p>
            <p>💨 Wind: ${current.wind_speed_10m} km/h</p>
            <p>🌍 Pressure: ${current.surface_pressure} hPa</p>
        `;

    })
    .catch(() => {
        weather.innerHTML = "<p>Unable to load weather data.</p>";
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