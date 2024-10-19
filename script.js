let currentIndex = 0;

const images = document.querySelectorAll('.carrusel-fotos img');
const totalImages = images.length;

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    const offset = -currentIndex * 100; // Desplazamiento en porcentaje
    document.querySelector('.carrusel-fotos').style.transform = `translateX(${offset}%)`;
}

// Cambia la imagen cada 3 segundos
setInterval(showNextImage, 3000);