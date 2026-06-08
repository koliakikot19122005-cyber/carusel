class Carousel {
    constructor(images, width = 200, height = 300) {
        this.images = images;
        this.widthItem = width;
        this.heightItem = height;
        
        this.currentIndex = 0;
        this.timer = null;
        this.isPaused = false;

        this.container = this.createNewElement();
        this.renderPhotos();
        this.dotsContainer = this.createDots();
        this.buttons = this.createButtons();
        this.slider = this.container.querySelector('.moveinlinecontainer');
        this.initEvents();
        this.startAutoPlay();
    }

    createNewElement() {
        const newElement = document.createElement('div');
        newElement.className = "gg";
        document.body.appendChild(newElement);
        return newElement;
    }

    renderPhotos() {
        const moveInlineContainer = document.createElement('div');
        moveInlineContainer.classList.add('moveinlinecontainer');

        this.images.forEach(image => {
            const img = document.createElement('img');
            img.src = image;
            img.style.width = `${this.widthItem}px`;
            img.style.height = `${this.heightItem}px`;
            moveInlineContainer.appendChild(img);
        });
        this.container.appendChild(moveInlineContainer);
    }

    createDots() {
        const dotsContainer = document.createElement('div');
        dotsContainer.classList.add('dots-container');
        
        this.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.changeSlide(index);
                if (!this.isPaused) this.startAutoPlay();
            });
            
            dotsContainer.appendChild(dot);
        });
        
        document.body.appendChild(dotsContainer);
        return dotsContainer;
    }

    createButtons() {
        const controlsDiv = document.createElement('div');
        controlsDiv.className = "controls";

        const buttonBack = document.createElement('button');
        const buttonToggle = document.createElement('button');
        const buttonNext = document.createElement('button');
        
        buttonBack.innerText = "back";
        buttonToggle.innerText = "PAUSE";
        buttonNext.innerText = "NEXT";
        
        controlsDiv.appendChild(buttonBack);
        controlsDiv.appendChild(buttonToggle);
        controlsDiv.appendChild(buttonNext);
        document.body.appendChild(controlsDiv);
        
        return { buttonBack, buttonToggle, buttonNext };
    }

    changeSlide(index) {
        this.currentIndex = index;
        this.slider.style.transform = `translateX(-${this.currentIndex * this.widthItem}px)`;
        
        const allDots = this.dotsContainer.querySelectorAll('.dot');
        allDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });
    }

    nextSlide() {
        if (this.currentIndex < this.images.length - 1) {
            this.changeSlide(this.currentIndex + 1);
        } else {
            this.changeSlide(0); 
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.changeSlide(this.currentIndex - 1);
        } else {
            this.changeSlide(this.images.length - 1); 
        }
    }

    startAutoPlay() {
        this.stopAutoPlay(); 
        this.timer = setInterval(() => this.nextSlide(), 3000); 
    }

    stopAutoPlay() {
        clearInterval(this.timer);
    }

    initEvents() {
        
        this.buttons.buttonNext.addEventListener("click", () => {
            this.nextSlide();
            if (!this.isPaused) this.startAutoPlay();
        });

        this.buttons.buttonBack.addEventListener("click", () => {
            this.prevSlide();
            if (!this.isPaused) this.startAutoPlay();
        });

        this.buttons.buttonToggle.addEventListener("click", () => {
            if (this.isPaused) {
                this.isPaused = false;
                this.buttons.buttonToggle.innerText = "PAUSE";
                this.startAutoPlay();
            } else {
                this.isPaused = true;
                this.buttons.buttonToggle.innerText = "START";
                this.stopAutoPlay();
            }
        });

        
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => {
            if (!this.isPaused) this.startAutoPlay();
        });

        
        document.addEventListener('keydown', (e) => {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                return; 
            }

            if (e.key === 'ArrowRight') {
                e.preventDefault(); 
                this.nextSlide();
                if (!this.isPaused) this.startAutoPlay(); 
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault(); 
                this.prevSlide();
                if (!this.isPaused) this.startAutoPlay(); 
            }
        });
    }
}

const picters = [
    'https://picsum.photos/id/237/200/300',
    'https://picsum.photos/id/238/200/300',
    'https://picsum.photos/id/239/200/300',
    'https://picsum.photos/id/232/200/300'
];
const myCarousel = new Carousel(picters, 200, 300);
