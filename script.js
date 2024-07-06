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

const links = document.querySelectorAll('nav ul li a');

links.forEach(link => {
    link.addEventListener('click', function (event) {
        links.forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
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