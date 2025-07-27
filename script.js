// // 🎯 Global Setup
// document.addEventListener("DOMContentLoaded", () => {
//     initCountdown();
//     initQuiz();
//     initWishesWall();
//     initSlideshow();
//     initBalloonGame();
// });

// // ⏳ Countdown Timer
// function initCountdown() {
//     function getNextBirthday(month, day) {
//         const now = new Date();
//         let year = now.getFullYear();
//         const birthdayThisYear = new Date(year, month - 1, day);
//         if (now > birthdayThisYear) year++;
//         return new Date(year, month - 1, day);
//     }

//     const birthday = getNextBirthday(8, 4); // August 4
//     const timer = document.getElementById("timer");

//     setInterval(() => {
//         const now = new Date();
//         const diff = birthday - now;

//         if (diff <= 0) {
//             timer.innerHTML = "🎉 Happy Birthday! 🎉";
//             return;
//         }

//         const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//         const minutes = Math.floor((diff / 1000 / 60) % 60);
//         const seconds = Math.floor((diff / 1000) % 60);

//         document.getElementById("days").textContent = String(days).padStart(2, "0");
//         document.getElementById("hours").textContent = String(hours).padStart(2, "0");
//         document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
//         document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
//     }, 1000);
// }

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initQuiz();
    initWishesWall();
    initSlideshow();
    initBalloonGame();
});

function initCountdown() {
    function getNextBirthday(month, day) {
        const now = new Date();
        let year = now.getFullYear();
        const birthdayThisYear = new Date(year, month - 1, day);
        if (now > birthdayThisYear) year++;
        return new Date(year, month - 1, day);
    }

    const birthday = getNextBirthday(8, 4); // August 4
    const timer = document.getElementById("timer");

    setInterval(() => {
        const now = new Date();
        const diff = birthday - now;

        if (diff <= 0) {
            timer.innerHTML = "🎉 Happy Birthday! 🎉";
            document.body.classList.add("birthday-mode");
            playSurprise();
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = String(days).padStart(2, "0");
        document.getElementById("hours").textContent = String(hours).padStart(2, "0");
        document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
        document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
    }, 1000);
}

function playSurprise() {
    alert("🎉 Surprise! Happy Birthday Azam Sir!\nWe all love and admire you so much!");
    const audio = new Audio('audio/surprise-sound.mp3');
    audio.play();
}

// 🧠 Quiz Logic (Hardcoded)
function initQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    const submitBtn = document.getElementById("submitQuiz");

    const quizData = [
        { question: "What's their favorite Profession?", options: ["App Development", "Web Development", "Data Science"], answer: "Web Development" },
        { question: "Which month were they born?", options: ["January", "August", "June"], answer: "August" },
        { question: "Favorite dessert?", options: ["Cake", "Ice Cream", "Cookies"], answer: "Cake" }
    ];

    quizData.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${q.question}</p>` + q.options.map(opt => `
      <label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`).join("");
        quizContainer.appendChild(div);
    });

    submitBtn.onclick = () => {
        let score = 0;
        quizData.forEach((q, i) => {
            const selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (selected && selected.value === q.answer) score++;
        });
        alert(`You got ${score} / ${quizData.length} correct!`);
    };
}

// 💌 Digital Wishes Wall
function initWishesWall() {
    const form = document.getElementById("wishForm");
    const display = document.getElementById("wishesDisplay");
    const wishes = JSON.parse(localStorage.getItem("birthdayWishes") || "[]");

    function renderWishes() {
        display.innerHTML = "";
        wishes.forEach(wish => {
            const div = document.createElement("div");
            div.className = "wish";
            div.innerHTML = `<strong>${wish.name}:</strong> ${wish.message}`;
            display.appendChild(div);
        });
    }

    form.onsubmit = e => {
        e.preventDefault();
        const name = document.getElementById("nameInput").value.trim();
        const msg = document.getElementById("messageInput").value.trim();
        if (!name || !msg) return alert("Please fill in all fields.");
        wishes.push({ name, message: msg });
        localStorage.setItem("birthdayWishes", JSON.stringify(wishes));
        form.reset();
        renderWishes();
    };

    renderWishes();
}

function initBalloonGame() {
    const gameArea = document.getElementById("game-area");
    const result = document.getElementById("gameResult");
    const totalBalloons = 6;
    let popped = 0;

    // Reset area
    gameArea.innerHTML = "";
    result.textContent = "";

    for (let i = 0; i < totalBalloons; i++) {
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.textContent = "🎈";

        balloon.addEventListener("click", () => {
            if (!balloon.classList.contains("popped")) {
                balloon.classList.add("popped");
                balloon.textContent = "💥";
                popped++;

                if (popped === totalBalloons) {
                    result.textContent = "🎉 You popped all the balloons! Happy Birthday! 🎉";
                }
            }
        });

        gameArea.appendChild(balloon);
    }
}


// 📸 Static Slideshow Loader
function initSlideshow() {
    const container = document.getElementById("slideshowContainer");

    const images = [
        "images/img1.jpg",
        "images/img1.jpg",
        "images/img1.jpg",
        "images/img1.jpg",
        "images/img1.jpg",
        // add more filenames here
    ];

    images.forEach((src) => {
        const img = document.createElement("img");
        img.src = src;
        container.appendChild(img);
    });
}
