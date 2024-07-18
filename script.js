// document.addEventListener("DOMContentLoaded", function () {
//     const scroll = new LocomotiveScroll({
//         el: document.querySelector(".deals-section"),
//         smooth: true,
//         direction: 'horizontal'
//     });
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const container = document.querySelector('.deals-container');
//     Scrollbar.init(container, { 
//         damping: 0.1, 
//         alwaysShowTracks: true 
//     });
// });

// Locomotive
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector("[data-scroll-container]");

    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.1,
        multiplier: 0.5,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        },

    });

    // Hero section animations
    gsap.from('.hero-section .text', {
        opacity: 0,
        x: -50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 1
    });

    gsap.from('.nav__container', {
        opacity: 0,
        y: -50,
        duration: 1.5,
        ease: 'power4.out',
        delay: 1.2
    });

    gsap.from('.hero_img', {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power4.out',
        delay: 1.8
    });
    gsap.from('.green_bg', {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0
    });


    const timelineItems = document.querySelectorAll('.timeline-ul li');
    const imgElementContainer = document.querySelector('.right-img');
    let currentImgElement = null;

    // scroll.on('scroll', (instance) => {
    //     timelineItems.forEach((item, index) => {
    //         if (isInViewport(item)) {
    //             setTimeout(() => {
    //                 item.classList.add('show');
    //                 const newImgElement = document.createElement('img');
    //                 newImgElement.src = item.dataset.image;
    //                 newImgElement.className = 'pizza-img active';
    //                 imgElementContainer.appendChild(newImgElement);
    //                 if (currentImgElement) {
    //                     currentImgElement.classList.add('hidden');
    //                     setTimeout(() => {
    //                         currentImgElement.remove();
    //                     }, 2500); // Match the duration of CSS transition
    //                 }
    //                 currentImgElement = newImgElement;
    //             }, index * 500); // Delay each item's activation by 0.3 seconds
    //         } else {
    //             item.classList.remove('show');
    //             const images = imgElementContainer.querySelectorAll('.pizza-img');
    //             images.forEach((img) => {
    //                 img.classList.add('hidden');
    //                 setTimeout(() => {
    //                     img.remove();
    //                 }, 1000); // Match the duration of CSS transition
    //             });
    //             currentImgElement = null;
    //         }
    //     });
    // });

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

});


// for Journey section 
document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-ul li');
    const imgElementContainer = document.querySelector('.right-img');
    let currentImgElement = null;

    // Initialize IntersectionObserver
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


    // Animation for Journey Section
    const section = document.querySelector('.Journey');
    observer.observe(section);

    // Function to handle the animation of timeline items
    const animateTimelineItems = () => {
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
                const newImgElement = document.createElement('img');
                newImgElement.src = item.dataset.image;
                newImgElement.className = 'pizza-img active';
                imgElementContainer.appendChild(newImgElement);
                if (currentImgElement) {
                    currentImgElement.classList.add('hidden');
                    setTimeout(() => {
                        currentImgElement.remove();
                    }, 2500); // Match the duration of CSS transition
                }
                currentImgElement = newImgElement;
            }, index * 500); // Delay each item's activation by 0.3 seconds
        });
    };

    // Function to handle deactivation of timeline items
    const deactivateItems = () => {
        timelineItems.forEach((item) => {
            item.classList.remove('show');
        });
        const images = imgElementContainer.querySelectorAll('.pizza-img');
        images.forEach((img) => {
            img.classList.add('hidden');
            setTimeout(() => {
                img.remove();
            }, 1000); // Match the duration of CSS transition
        });
        currentImgElement = null;
    };
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
