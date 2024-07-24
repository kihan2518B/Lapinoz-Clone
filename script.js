
// Navbar Animation
document.querySelectorAll('.navbar__button-list a').forEach(link => {
    let textContent = link.textContent.trim();
    let spans = textContent.split('').map((char, i) => `<span style="transition-delay: ${i * 0.05}s;">${char}</span>`).join('');
    link.innerHTML = `<div>${spans}</div>`;
});


// Locomotive
document.addEventListener('DOMContentLoaded', () => {


    const scrollContainer = document.querySelector('.scroll-container');
    const scroll = new LocomotiveScroll({
        el: document.querySelector('.scroll-container'),
        smooth: true,
        lerp: 0.12,
        reloadOnContextChange: true,
        tablet: { smooth: true, breakpoint: 1024 },
        smartphone: { smooth: true, breakpoint: 767 }
    });

    // Hero Animation
    gsap.from('.hero-section .text', {
        opacity: 0,
        x: -50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 11.5
    });

    gsap.from('.nav__container', {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 11.7
    });

    gsap.from('.hero_img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power4.out',
        delay: 11.9
    });

    gsap.from('.green_bg', {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power4.out',
        delay: 11.8
    });


    // Hidding loaders
    function fadeOutLoaders() {
        const loader1Wrapper = document.querySelector(".loader1wrapper");
        // const loader2 = document.querySelector(".loader2");

        // Wait for the transition to complete (4 seconds)
        setTimeout(() => {
            loader1Wrapper.style.display = "none";
            // loader2.style.display = "none";
            loader1Wrapper.style.opacity = "0";
            // loader2.style.opacity = "0";
            showLoader3();
        }, 5000);
    }

    // Show loader3 and set up its animation
    function showLoader3() {
        const loader3Container = document.querySelector(".loader3container");
        loader3Container.style.display = "flex";
        loader3Container.style.opacity = "1";

        // Wait for the loader3 animation to complete (6 seconds)
        setTimeout(() => {
            hideWholeLoader();
        }, 6000);
    }

    // Hide whole loader and show main content
    function hideWholeLoader() {
        const main = document.querySelector("#main");
        const wholeLoader = document.querySelector(".wholeLoader");
        main.style.display = "block";
        wholeLoader.style.display = "none";
        wholeLoader.style.opacity = "0";

        // Update LocomotiveScroll to reflect layout changes
        scroll.update();

    }

    fadeOutLoaders()


    function updateScrollSpeed() {
        // For responsive scroll speed
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        // country scroller
        const countrytrack = document.querySelector('#Country-track');
        const defaultScrollSpeed = countrytrack.getAttribute('data-scroll-speed');

        // text scroller
        const rotateLeft = document.querySelector('.rotate-left');
        const rotateDefaultspeedLeft = rotateLeft.getAttribute('data-scroll-speed');

        const rotateRight = document.querySelector('.rotate-right');
        const rotateDefaultspeedRight = rotateRight.getAttribute('data-scroll-speed');

        const hero__content_left = document.querySelector(".hero__content_left");
        const defaultHeroTextSpeed = hero__content_left.getAttribute('data-scroll-speed');

        if (hero__content_left.hasAttribute('data-scroll-speed-mobile')) {
            const scrollSpeed = isMobile ? -0.1 : defaultHeroTextSpeed;
            hero__content_left.setAttribute('data-scroll-speed', scrollSpeed);
        }

        if (rotateLeft.hasAttribute('data-scroll-speed-mobile')) {

            const scrollSpeed = isMobile ? 2 : rotateDefaultspeedLeft;
            rotateLeft.setAttribute('data-scroll-speed', scrollSpeed);
        }

        if (rotateRight.hasAttribute('data-scroll-speed-mobile')) {
            const scrollSpeed = isMobile ? -2 : rotateDefaultspeedRight;
            rotateRight.setAttribute('data-scroll-speed', scrollSpeed);
        }


        if (countrytrack.hasAttribute('data-scroll-speed-mobile')) {
            const scrollSpeed = isMobile ? 5 : defaultScrollSpeed;
            countrytrack.setAttribute('data-scroll-speed', scrollSpeed);
        }

        scroll.update();
    }

    // Initial update
    updateScrollSpeed();
    // Update on resize
    window.addEventListener('resize', updateScrollSpeed);

    // Hero section animations


    scroll.on('scroll', (args) => {
        const elements = args.currentElements;
        const pizzaImages = document.querySelectorAll('.right-img img');

        for (const key in elements) {
            if (elements[key].el.classList.contains('is-inview')) {
                const imageUrl = elements[key].el.getAttribute('data-image');
                if (imageUrl) {
                    pizzaImages.forEach(img => {
                        if (img.getAttribute('src') === imageUrl) {
                            img.classList.add('is-visible');
                        } else {
                            img.classList.remove('is-visible');
                        }
                    });
                }
            }
        }
    });

    scroll.on('call', (value, way, obj) => {
        if (value === 'animate') {
            if (way === 'enter') {
                obj.el.classList.add('show');
                animateTimelineItems();
            } else {
                obj.el.classList.remove('show');
                deactivateItems();
            }
        }
    });

    // Helper function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // // Initialize IntersectionObserver
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelector('.Journey').classList.add('show');
                animateTimelineItems();
            } else {
                document.querySelector('.Journey').classList.remove('show');
                deactivateItems();
            }
        });
    }, { threshold: 0.5 });

    // // Function to handle the animation of timeline items
    const animateTimelineItems = () => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 500); // Delay each item's activation by 0.3 seconds
        });
    };

    // Function to handle deactivation of timeline items
    const deactivateItems = () => {
        timelineItems.forEach((item) => {
            item.classList.remove('show');
        });
        currentImgElement = null;
    };

    // Countries section
    const options = {
        threshold: 0.1
    };

    const CustomObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, options);
    const CountriesSection = document.querySelector(".country-scroll-section");
    CustomObserver.observe(CountriesSection);

    scroll.on('call', (func, direction, obj) => {
        if (func === 'toggleBgColor' && direction === 'enter') {
            document.querySelector('.country-scroll-section').style.backgroundColor = 'black';
        } else if (func === 'toggleBgColor' && direction === 'leave') {
            document.querySelector('.country-scroll-section').style.backgroundColor = 'white';
        }
    });

});


// Cursor
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('customCursor');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    const updateCursor = () => {
        posX += (mouseX - posX) * 0.1; // Smooth transition
        posY += (mouseY - posY) * 0.1; // Smooth transition

        customCursor.style.transform = `translate(${posX}px, ${posY + window.scrollY}px)`; // Adjust for scroll

        requestAnimationFrame(updateCursor);
    };

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY; // Track mouse position
    });

    // Initialize animation
    requestAnimationFrame(updateCursor);
});




//Hero Sections

document.addEventListener("DOMContentLoaded", function () {
    var closeButton = document.querySelector(".close");
    var outsideContent = document.querySelector(".outside");
    var bars = document.querySelectorAll(".bar");

    closeButton.addEventListener("click", function () {
        outsideContent.classList.toggle("in");
        bars.forEach(function (bar) {
            bar.classList.toggle("active");
        });
        closeButton.classList.toggle("is-showing");
    });
});


const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    links.forEach(link => {
        link.addEventListener('mouseenter', function () {
            links.forEach(otherLink => {
                if (otherLink !== this) {
                    otherLink.classList.add('opacity50');
                }
            });
        });

        link.addEventListener('mouseleave', function () {
            links.forEach(otherLink => {
                if (otherLink !== this) {
                    otherLink.classList.remove('opacity50');
                }
            });
        });
    });
    link.addEventListener('click', function (event) {
        links.forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});


const image = document.querySelector('.hero_img');
const container = document.querySelector('.hero_img_container');

let animationFrame;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

function animate() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    image.style.transform = `translate(${currentX}px, ${currentY}px)`;

    animationFrame = requestAnimationFrame(animate);
}

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetX = (mouseX - centerX) * 0.1;
    targetY = (mouseY - centerY) * 0.1;

    if (!animationFrame) {
        animate();
    }
});

container.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
    targetX = 0;
    targetY = 0;
    animate();  // Smoothly return to the center
});

// Footer
const bubblesContainer = document.querySelector('.site-footer .bubbles');
for (let i = 0; i < 128; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.setProperty('--size', `${2 + Math.random() * 4}rem`);
    bubble.style.setProperty('--distance', `${6 + Math.random() * 4}rem`);
    bubble.style.setProperty('--position', `${-5 + Math.random() * 110}%`);
    bubble.style.setProperty('--time', `${2 + Math.random() * 2}s`);
    bubble.style.setProperty('--delay', `${-1 * (2 + Math.random() * 2)}s`);
    bubblesContainer.appendChild(bubble);
}