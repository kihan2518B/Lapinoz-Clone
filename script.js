
// Navbar Animation
document.querySelectorAll('.navbar__button-list a').forEach(link => {
    let textContent = link.textContent.trim();
    let spans = textContent.split('').map((char, i) => `<span style="transition-delay: ${i * 0.05}s;">${char}</span>`).join('');
    link.innerHTML = `<div>${spans}</div>`;
});


// Locomotive
document.addEventListener('DOMContentLoaded', () => {


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

    // Delivery section
    const pickUpSection = document.querySelector('.PickUp');
    const deliverySection = document.querySelector('.delivrySection');
    const deliveryContent = deliverySection.querySelectorAll('.delivrySection__textArea, .delivrySection__header, .SelectButtons'); // Select all content elements
    const pickUpContent = pickUpSection.querySelectorAll('.delivrySection__header, .containt_section, .PickUp'); // Select all content elements for PickUp

    const deliveryButtons = document.querySelectorAll('.delivrySection__heading__button'); // Select all delivery buttons

    // Initially hide PickUp content
    pickUpContent.forEach(element => element.style.opacity = 0);

    function swapSections() {
        const isDeliveryHidden = deliverySection.classList.contains('hidden'); // Check if deliverySection is hidden

        if (isDeliveryHidden) {
            // Reverse animation (PickUp to front)
            gsap.to(pickUpSection, {
                duration: 1.5,
                zIndex: 10,
                onComplete: () => {
                    deliverySection.classList.remove('hidden'); // Show deliverySection content
                    pickUpSection.classList.remove('bg-color-white')

                    deliveryContent.forEach(element => element.style.opacity = 1);
                    pickUpContent.forEach(element => element.style.opacity = 0); // Hide PickUp content
                }
            });

            gsap.to(deliverySection, {
                duration: 1.5,
                width: '100%', // Restore initial width
            });
        } else {
            // Hide content before animation
            deliveryContent.forEach(element => element.style.opacity = 0);
            gsap.to(deliverySection, {
                duration: 1.5,
                width: '35px',
                onComplete: () => {
                    deliverySection.classList.add('hidden'); // Hide deliverySection content after animation
                    pickUpContent.forEach(element => element.style.opacity = 1); // Show PickUp content
                    pickUpSection.classList.add('bg-color-white')
                }
            });

            gsap.to(pickUpSection, {
                duration: 1.5,
                zIndex: 10,
            });
        }
    }

    deliveryButtons.forEach(button => button.addEventListener('click', swapSections));

    // Deals section
    const getCodes = document.querySelectorAll(".card-hover__link");
    const cardHovers = document.querySelectorAll(".card-hover");

    if (getCodes.length && cardHovers.length) {
        getCodes.forEach((getCode, index) => {
            const cardHoverExtra = cardHovers[index].querySelector(".card-hover__extra");

            getCode.addEventListener("click", () => {
                if (cardHoverExtra.classList.contains("clicked")) {
                    cardHoverExtra.classList.remove("clicked");
                } else {
                    cardHoverExtra.classList.add("clicked");
                }
            });

            cardHovers[index].addEventListener("mouseleave", () => {
                cardHoverExtra.classList.remove("clicked");
            });
        });
    } else {
        console.error("One or more elements were not found.");
    }


    const copyIcons = document.querySelectorAll(".copy-icon");

    const flashMessage = document.getElementById("flash-message");

    copyIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const discountCode = icon.parentElement.textContent.trim();
            navigator.clipboard.writeText(discountCode).then(() => {
                flashMessage.style.opacity = 1;
                setTimeout(() => {
                    flashMessage.style.opacity = 0;
                }, 2000); // Hide message after 2 seconds
            }).catch(err => {
                console.error("Failed to copy: ", err);
            });
        });
    });

    const container = document.querySelector('.deals__container');

    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
        isDown = false;
        container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        container.scrollLeft = scrollLeft - walk;
    });


    // Number counter
    const counterElement = document.getElementById('number_counter');
    const targetNumber = 600;
    const interval = 20; // Increment in bunches of 50
    const duration = 1500; // 2 seconds
    let isAnimating = false;

    // Initialize IntersectionObserver
    const numberobserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isAnimating) {
                    animateCounter(counterElement, targetNumber, duration, interval);
                }
            } else {
                resetCounter(counterElement);
            }
        });
    }, { threshold: 0.5 });

    // Observe the section
    const section = document.querySelector('.banner__section');
    numberobserver.observe(section);

    function animateCounter(element, target, duration, interval) {
        let currentNumber = 0;
        isAnimating = true;
        const stepTime = Math.abs(Math.floor(duration / (target / interval)));
        const timer = setInterval(() => {
            currentNumber += interval;
            element.textContent = `Over ${currentNumber}+`;
            if (currentNumber >= target) {
                clearInterval(timer);
                isAnimating = false;
            }
        }, stepTime);
    }

    function resetCounter(element) {
        element.textContent = "Over 0+";
        isAnimating = false;
    }

    // Three card
    const cards = document.querySelectorAll('.three-cards-inner');

    const threecardsObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const threecardsobserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = '0s';
                entry.target.classList.remove('reverse-animate');

                // Apply different animations based on the card's index
                const cardIndex = Array.from(cards).indexOf(entry.target);
                if (cardIndex % 3 === 0) { // Left card
                    entry.target.classList.add('animate-up');
                } else if (cardIndex % 3 === 1) { // Middle card
                    entry.target.classList.add('animate-down');
                } else if (cardIndex % 3 === 2) { // Right card
                    entry.target.classList.add('animate-up');
                }
            } else {
                entry.target.style.transitionDelay = '0s';
                entry.target.classList.remove('animate-up', 'animate-down');
                entry.target.classList.add('reverse-animate');
            }
        });
    }, threecardsObserverOptions);

    cards.forEach(card => {
        threecardsobserver.observe(card);
    });

    // Explore section
    const menuItems = document.querySelectorAll('.explore-menu-ul div');

    const explore_menuObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 250); // Staggered effect
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    menuItems.forEach(item => {
        explore_menuObserver.observe(item);
    });

    // Best seller
    const bestsellerSection = document.querySelector('.bestseller-section');
    const bestsellerCards = document.querySelector('.bestseller_cards');
    const BestsellerCard = bestsellerCards.querySelectorAll('li');

    function updateBackgroundImage() {
        const cardWidth = BestsellerCard[0].offsetWidth;
        const scrollLeft = bestsellerCards.scrollLeft;
        const secondCardIndex = Math.floor(scrollLeft / cardWidth) + 1;

        if (secondCardIndex >= 0 && secondCardIndex < BestsellerCard.length) {
            const secondCardImage = BestsellerCard[secondCardIndex].querySelector('.bestseller__card__image').src;

            // Remove previous background classes
            bestsellerSection.className = 'bestseller-section';

            // Add new background class
            bestsellerSection.style.backgroundImage = `url(${secondCardImage})`;
        }
    }

    // Attach the scroll event listener
    bestsellerCards.addEventListener('scroll', updateBackgroundImage);

    // Initial call to set the background image on page load
    updateBackgroundImage();

    // reviews
    const topContainer = document.querySelector('.reviews__top__slider');
    const bottomContainer = document.querySelector('.reviews__bottom__slider');
    const reviewsCard = document.querySelectorAll('.reviews__top__card');

    const topScrollInterval = 10; // Interval for the top container
    const bottomScrollInterval = 19; // Interval for the bottom container (adjust as needed)
    const scrollStep = 1; // Number of pixels to scroll in each step

    // Clone cards and append them to both containers to create the illusion of an infinite scroll
    reviewsCard.forEach(card => {
        const topClone = card.cloneNode(true);
        topContainer.appendChild(topClone);

        const bottomClone = card.cloneNode(true);
        bottomContainer.appendChild(bottomClone);
    });

    function scrollTopContainer() {
        topContainer.scrollLeft += scrollStep;

        // When the original set of cards has fully scrolled, reset to the start
        if (topContainer.scrollLeft >= topContainer.scrollWidth / 2) {
            topContainer.scrollLeft = 0;
        }
    }

    function scrollBottomContainer() {
        bottomContainer.scrollLeft -= scrollStep;

        // When the bottom container has fully scrolled back to the start, reset its position
        if (bottomContainer.scrollLeft <= 0) {
            bottomContainer.scrollLeft = bottomContainer.scrollWidth / 2;
        }
    }

    // Scroll the top container continuously
    setInterval(scrollTopContainer, topScrollInterval);

    // Scroll the bottom container continuously
    setInterval(scrollBottomContainer, bottomScrollInterval);

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