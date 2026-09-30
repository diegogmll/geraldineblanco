/* Animaciones al hacer scroll */
const revealElements=document.querySelectorAll(".reveal");
const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}})},{threshold:.12});
revealElements.forEach(element=>revealObserver.observe(element));

/* Menú fijo y discreto al desplazarse */
const navigation=document.querySelector(".nav");
function updateNavigation(){if(!navigation)return;if(window.scrollY>80)navigation.classList.add("scrolled");else navigation.classList.remove("scrolled");}
window.addEventListener("scroll",updateNavigation,{passive:true}); updateNavigation();

/* Carrusel de reseñas */
const track=document.querySelector(".carousel-track");
const slides=document.querySelectorAll(".review-slide");
const nextButton=document.querySelector(".carousel-btn.next");
const prevButton=document.querySelector(".carousel-btn.prev");
const dots=document.querySelectorAll(".carousel-dot");
const reviewVideos=document.querySelectorAll(".review-slide video");
let currentIndex=0;
let autoPlay;
let videoFallback;

function pauseAllVideos(){reviewVideos.forEach(video=>{video.pause();});}

function clearCarouselTimers(){clearInterval(autoPlay);clearTimeout(videoFallback);}

function playActiveVideo(){
    clearCarouselTimers();
    const activeVideo=reviewVideos[currentIndex];
    if(!activeVideo)return;

    reviewVideos.forEach((video,index)=>{
        video.muted=true;
        if(index!==currentIndex)video.pause();
    });

    activeVideo.currentTime=0;
    activeVideo.muted=true;
    const playPromise=activeVideo.play();

    if(playPromise!==undefined){
        playPromise.catch(()=>{
            videoFallback=setTimeout(()=>nextSlide(),5500);
        });
    }
}

function showSlide(index){
    if(!track||slides.length===0)return;
    if(index>=slides.length)currentIndex=0;
    else if(index<0)currentIndex=slides.length-1;
    else currentIndex=index;

    clearCarouselTimers();
    track.style.transform=`translateX(-${currentIndex*100}%)`;
    dots.forEach((dot,i)=>dot.classList.toggle("active",i===currentIndex));
    playActiveVideo();
}

function nextSlide(){showSlide(currentIndex+1);}
function previousSlide(){showSlide(currentIndex-1);}

if(nextButton)nextButton.addEventListener("click",()=>{nextSlide();});
if(prevButton)prevButton.addEventListener("click",()=>{previousSlide();});
dots.forEach(dot=>dot.addEventListener("click",()=>{showSlide(Number(dot.dataset.slide));}));

reviewVideos.forEach(video=>{
    video.muted=true;
    video.setAttribute("autoplay","");
    video.setAttribute("playsinline","");
    video.addEventListener("play",()=>clearCarouselTimers());
    video.addEventListener("ended",()=>nextSlide());
    video.addEventListener("error",()=>{
        if(video===reviewVideos[currentIndex]){
            clearCarouselTimers();
            videoFallback=setTimeout(()=>nextSlide(),5500);
        }
    });
});

showSlide(0);

/* Pausar el carrusel al pasar el mouse */
const carousel=document.querySelector(".review-carousel");
if(carousel){
    carousel.addEventListener("mouseenter",()=>clearCarouselTimers());
    carousel.addEventListener("mouseleave",()=>{
        const activeVideo=reviewVideos[currentIndex];
        if(activeVideo&&activeVideo.paused)playActiveVideo();
    });
}

/* Deslizar carrusel en celular */
let touchStartX=0;
let touchEndX=0;
if(carousel){
    carousel.addEventListener("touchstart",event=>{touchStartX=event.changedTouches[0].screenX;},{passive:true});
    carousel.addEventListener("touchend",event=>{
        touchEndX=event.changedTouches[0].screenX;
        const difference=touchStartX-touchEndX;
        if(Math.abs(difference)>=50){
            if(difference>0)nextSlide();
            else previousSlide();
        }
    });
}

/* Cambiar reseñas con las flechas del teclado */
document.addEventListener("keydown",event=>{
    if(event.key==="ArrowRight")nextSlide();
    if(event.key==="ArrowLeft")previousSlide();
});

/* Protección básica de la página */
document.addEventListener("contextmenu",event=>event.preventDefault());
document.addEventListener("keydown",event=>{if(event.key==="F12"||(event.ctrlKey&&event.key.toLowerCase()==="u")||(event.ctrlKey&&event.shiftKey&&["i","j","c"].includes(event.key.toLowerCase()))){event.preventDefault();}});
