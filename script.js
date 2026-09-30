/* Animaciones al hacer scroll */
const revealElements=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}})},{threshold:.12});
revealElements.forEach(element=>revealObserver.observe(element));

/* MenÃº fijo y discreto al desplazarse */
const navigation=document.querySelector(".nav");
function updateNavigation(){if(!navigation)return;if(window.scrollY>80)navigation.classList.add("scrolled");else navigation.classList.remove("scrolled");}
window.addEventListener("scroll",updateNavigation,{passive:true}); updateNavigation();

/* Carrusel de reseÃ±as */
const track=document.querySelector(".carousel-track");
const slides=document.querySelectorAll(".review-slide");
const nextButton=document.querySelector(".carousel-btn.next");
const prevButton=document.querySelector(".carousel-btn.prev");
const dots=document.querySelectorAll(".carousel-dot");
const reviewVideos=document.querySelectorAll(".review-slide video");
let currentIndex=0; let autoPlay;
function pauseAllVideos(){reviewVideos.forEach(video=>video.pause());}
function showSlide(index){if(!track||slides.length===0)return;if(index>=slides.length)currentIndex=0;else if(index<0)currentIndex=slides.length-1;else currentIndex=index;track.style.transform=`translateX(-${currentIndex*100}%)`;dots.forEach((dot,i)=>dot.classList.toggle("active",i===currentIndex));pauseAllVideos();}
function nextSlide(){showSlide(currentIndex+1);}
function previousSlide(){showSlide(currentIndex-1);}
if(nextButton)nextButton.addEventListener("click",()=>{nextSlide();restartAutoPlay();});
if(prevButton)prevButton.addEventListener("click",()=>{previousSlide();restartAutoPlay();});
dots.forEach(dot=>dot.addEventListener("click",()=>{showSlide(Number(dot.dataset.slide));restartAutoPlay();}));
function startAutoPlay(){clearInterval(autoPlay);autoPlay=setInterval(nextSlide,5500);}
function restartAutoPlay(){clearInterval(autoPlay);startAutoPlay();}
reviewVideos.forEach(video=>{video.muted=true;video.addEventListener("play",()=>clearInterval(autoPlay));video.addEventListener("pause",()=>startAutoPlay());video.addEventListener("ended",()=>startAutoPlay());});
showSlide(0);startAutoPlay();

/* Pausar el carrusel al pasar el mouse */
const carousel=document.querySelector(".review-carousel");
if(carousel){carousel.addEventListener("mouseenter",()=>clearInterval(autoPlay));carousel.addEventListener("mouseleave",()=>{const activeVideo=reviewVideos[currentIndex];if(!activeVideo||activeVideo.paused)startAutoPlay();});}

/* Deslizar carrusel en celular */
let touchStartX=0;let touchEndX=0;
if(carousel){carousel.addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX;},{passive:true});carousel.addEventListener("touchend",event=>{touchEndX=event.changedTouches[0].screenX;const difference=touchStartX-touchEndX;if(Math.abs(difference)>=50){if(difference>0)nextSlide();else previousSlide();restartAutoPlay();}});}

/* Cambiar reseÃ±as con las flechas del teclado */
document.addEventListener("keydown",event=>{if(event.key==="ArrowRight"){nextSlide();restartAutoPlay();}if(event.key==="ArrowLeft"){previousSlide();restartAutoPlay();}});

/* ProtecciÃ³n bÃ¡sica de la pÃ¡gina */
document.addEventListener("contextmenu",event=>event.preventDefault());
document.addEventListener("keydown",event=>{if(event.key==="F12"||(event.ctrlKey&&event.key.toLowerCase()==="u")||(event.ctrlKey&&event.shiftKey&&["i","j","c"].includes(event.key.toLowerCase()))){event.preventDefault();}});
