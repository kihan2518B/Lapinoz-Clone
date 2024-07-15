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

document.addEventListener('DOMContentLoaded', () => {
    console.log("Loaded")
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, options);

    const sections = document.querySelectorAll('section');
    const Paras = document.querySelectorAll("p");
    Paras.forEach((Para) => {
        observer.observe(Para)
    })

    sections.forEach((section) => {
        observer.observe(section);
    });
});