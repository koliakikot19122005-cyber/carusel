const widthitem = 200;
const heightitem = 300;

const picters = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/238/200/300',
    'https://picsum.photos/id/239/200/300',
    'https://picsum.photos/id/232/200/300'
];


function createnewElement() {
    const NewElement = document.createElement('div');
    NewElement.className = "gg";
    document.body.appendChild(NewElement);
    return NewElement;
}

function renderphooto(listiOfimg, con1) {
    const moveinlinecontainer = document.createElement('div');
    moveinlinecontainer.classList.add('moveinlinecontainer');

    listiOfimg.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        moveinlinecontainer.appendChild(img);
    });
    con1.appendChild(moveinlinecontainer);
}

function createDots(listiOfimg) {
    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');
    
    listiOfimg.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active'); // Перша крапка активна відразу
        
        // Клік по крапці переводить на відповідний слайд
        dot.addEventListener('click', () => {
            changeSlide(index);
            if (!isPaused) startAutoPlay(); // Перезапускаємо таймер, якщо немає паузи
        });
        
        dotsContainer.appendChild(dot);
    });
    
    document.body.appendChild(dotsContainer);
    return dotsContainer;
}

function CreateButtons() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = "controls";

    const buttonback = document.createElement('button');
    const buttontoggle = document.createElement('button');
    const buttonnext = document.createElement('button');
    
    buttonback.innerText = "back";
    buttontoggle.innerText = "PAUSE";
    buttonnext.innerText = "NEXT";
    
    controlsDiv.appendChild(buttonback);
    controlsDiv.appendChild(buttontoggle);
    controlsDiv.appendChild(buttonnext);
    document.body.appendChild(controlsDiv);
    
    return { buttonback, buttontoggle, buttonnext };
}


const con1 = createnewElement();
renderphooto(picters, con1);
const dotsContainer = createDots(picters); 
const buttons = CreateButtons();
const slider = document.querySelector('.moveinlinecontainer');

let currentIndex = 0;
let timer; 
let isPaused = false;

function changeSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * widthitem}px)`;
    

    const allDots = dotsContainer.querySelectorAll('.dot');
    allDots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextSlide() {
    if (currentIndex < picters.length - 1) {
        changeSlide(currentIndex + 1);
    } else {
        changeSlide(0); 
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        changeSlide(currentIndex - 1);
    } else {
        changeSlide(picters.length - 1); 
    }
}


buttons.buttonnext.addEventListener("click", () => {
    nextSlide();
    if (!isPaused) startAutoPlay();
});

buttons.buttonback.addEventListener("click", () => {
    prevSlide();
    if (!isPaused) startAutoPlay();
});

buttons.buttontoggle.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        buttons.buttontoggle.innerText = "PAUSE";
        startAutoPlay();
    } else {
        isPaused = true;
        buttons.buttontoggle.innerText = "START";
        stopAutoPlay();
    }
});


function startAutoPlay() {
    stopAutoPlay(); 
    timer = setInterval(nextSlide, 3000); 
}

function stopAutoPlay() {
    clearInterval(timer);
}


con1.addEventListener('mouseenter', stopAutoPlay);
con1.addEventListener('mouseleave', () => {
    if (!isPaused) startAutoPlay();
});


document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
        return; 
    }

    if (e.key === 'ArrowRight') {
        e.preventDefault(); 
        nextSlide();
        if (!isPaused) startAutoPlay(); 
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault(); 
        prevSlide();
        if (!isPaused) startAutoPlay(); 
    }
});

startAutoPlay();