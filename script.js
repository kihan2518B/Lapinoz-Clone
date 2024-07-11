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
//Hero Sections
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