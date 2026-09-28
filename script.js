document.addEventListener("DOMContentLoaded", () => {

    // Animaciones al aparecer
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    elements.forEach((element) => {
        observer.observe(element);
    });


    // Carrusel de reseñas
    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".review-slide");
    const prevButton = document.querySelector(".carousel-btn.prev");
    const nextButton = document.querySelector(".carousel-btn.next");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;
    let autoPlay;


    function showSlide(index) {

        if (!track || slides.length === 0) {
            return;
        }

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });

    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function previousSlide() {
        showSlide(currentSlide - 1);
    }


    function startAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = setInterval(() => {
            nextSlide();
        }, 5500);

    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {
            nextSlide();
            startAutoPlay();
        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {
            previousSlide();
            startAutoPlay();
        });

    }


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);
            startAutoPlay();

        });

    });


    const carousel = document.querySelector(".review-carousel");


    if (carousel) {

        carousel.addEventListener("mouseenter", () => {
            clearInterval(autoPlay);
        });


        carousel.addEventListener("mouseleave", () => {
            startAutoPlay();
        });

    }


    // Deslizar carrusel en celular
    let touchStartX = 0;
    let touchEndX = 0;


    if (carousel) {

        carousel.addEventListener("touchstart", (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        });


        carousel.addEventListener("touchend", (event) => {

            touchEndX =
                event.changedTouches[0].screenX;


            if (touchStartX - touchEndX > 50) {
                nextSlide();
                startAutoPlay();
            }


            if (touchEndX - touchStartX > 50) {
                previousSlide();
                startAutoPlay();
            }

        });

    }


    // Flechas del teclado
    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {
            nextSlide();
            startAutoPlay();
        }


        if (event.key === "ArrowLeft") {
            previousSlide();
            startAutoPlay();
        }

    });


    showSlide(0);
    startAutoPlay();


    // Protección básica de la página
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });


    document.addEventListener("keydown", (event) => {

        // F12
        if (event.key === "F12") {
            event.preventDefault();
            return;
        }


        // Ctrl + U
        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "u"
        ) {
            event.preventDefault();
            return;
        }


        // Ctrl + Shift + I
        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "i"
        ) {
            event.preventDefault();
            return;
        }


        // Ctrl + Shift + J
        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "j"
        ) {
            event.preventDefault();
            return;
        }


        // Ctrl + Shift + C
        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "c"
        ) {
            event.preventDefault();
            return;
        }

    });

});
