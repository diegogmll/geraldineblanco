/* Animaciones al hacer scroll */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* Carrusel de reseñas */

const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".review-slide");

const nextButton = document.querySelector(".carousel-btn.next");
const prevButton = document.querySelector(".carousel-btn.prev");

const dots = document.querySelectorAll(".carousel-dot");

let currentIndex = 0;
let autoPlay;


/* Cambiar de reseña */

function showSlide(index) {

    if (!track || slides.length === 0) {
        return;
    }

    if (index >= slides.length) {

        currentIndex = 0;

    }

    else if (index < 0) {

        currentIndex = slides.length - 1;

    }

    else {

        currentIndex = index;

    }


    const offset = currentIndex * 100;

    track.style.transform = `translateX(-${offset}%)`;


    /* Actualizar puntos */

    dots.forEach((dot, index) => {

        if (index === currentIndex) {

            dot.classList.add("active");

        }

        else {

            dot.classList.remove("active");

        }

    });

}


/* Siguiente reseña */

function nextSlide() {

    showSlide(currentIndex + 1);

}


/* Reseña anterior */

function previousSlide() {

    showSlide(currentIndex - 1);

}


/* Botón siguiente */

if (nextButton) {

    nextButton.addEventListener("click", () => {

        nextSlide();

        restartAutoPlay();

    });

}


/* Botón anterior */

if (prevButton) {

    prevButton.addEventListener("click", () => {

        previousSlide();

        restartAutoPlay();

    });

}


/* Botones inferiores */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const slideNumber = Number(dot.dataset.slide);

        showSlide(slideNumber);

        restartAutoPlay();

    });

});


/* Cambio automático */

function startAutoPlay() {

    clearInterval(autoPlay);

    autoPlay = setInterval(() => {

        nextSlide();

    }, 5500);

}


function restartAutoPlay() {

    clearInterval(autoPlay);

    startAutoPlay();

}


/* Iniciar carrusel */

showSlide(0);
startAutoPlay();


/* Pausar el carrusel al pasar el mouse */

const carousel = document.querySelector(".review-carousel");

if (carousel) {

    carousel.addEventListener("mouseenter", () => {

        clearInterval(autoPlay);

    });


    carousel.addEventListener("mouseleave", () => {

        startAutoPlay();

    });

}


/* Deslizar carrusel en celular */

let touchStartX = 0;
let touchEndX = 0;


if (carousel) {

    carousel.addEventListener(
        "touchstart",
        (event) => {

            touchStartX = event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        (event) => {

            touchEndX = event.changedTouches[0].screenX;

            handleSwipe();

        }
    );

}


function handleSwipe() {

    const difference = touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {

        return;

    }


    if (difference > 0) {

        nextSlide();

    }

    else {

        previousSlide();

    }


    restartAutoPlay();

}


/* Cambiar reseñas con las flechas del teclado */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        nextSlide();

        restartAutoPlay();

    }


    if (event.key === "ArrowLeft") {

        previousSlide();

        restartAutoPlay();

    }

});


/* Protección básica de la página */


/* Bloquear clic derecho */

document.addEventListener("contextmenu", (event) => {

    event.preventDefault();

});


/* Bloquear algunos atajos del navegador */

document.addEventListener("keydown", (event) => {

    /* F12 */

    if (event.key === "F12") {

        event.preventDefault();

        return;

    }


    /* Ctrl + U */

    if (
        event.ctrlKey &&
        event.key.toLowerCase() === "u"
    ) {

        event.preventDefault();

        return;

    }


    /* Ctrl + Shift + I */

    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "i"
    ) {

        event.preventDefault();

        return;

    }


    /* Ctrl + Shift + J */

    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "j"
    ) {

        event.preventDefault();

        return;

    }


    /* Ctrl + Shift + C */

    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key.toLowerCase() === "c"
    ) {

        event.preventDefault();

        return;

    }

});
