// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== MOBILE MENU ==========
const burgerMenu = document.querySelector('.burger-menu');
const sidebar = document.querySelector('.sidebar');
const navItems = document.querySelectorAll('.nav-item');

if (burgerMenu) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth < 1200) {
            burgerMenu.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
});

// ========== ACTIVE NAV ON SCROLL ==========
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ========== SKILL BARS ANIMATION ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// ========== CAROUSEL FUNCTIONS ==========
function changeSlide(button, direction) {
    const carousel = button.closest('.carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const dots = carousel.querySelectorAll('.dot');
    let currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    currentIndex = (currentIndex + direction + images.length) % images.length;
    
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

function goToSlide(dot, index) {
    const carousel = dot.closest('.carousel');
    const images = carousel.querySelectorAll('.carousel-img');
    const dots = carousel.querySelectorAll('.dot');
    
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Navigation clavier pour le carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeCarousel = document.querySelector('.carousel:hover');
        if (activeCarousel) {
            const direction = e.key === 'ArrowLeft' ? -1 : 1;
            const button = activeCarousel.querySelector('.carousel-btn');
            if (button) changeSlide(button, direction);
        }
    }
});

// ========== FADE IN ON SCROLL ==========
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.project-card, .education-card, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// ========== CONSOLE MESSAGE ==========
console.log('%c🚀 Portfolio by Thierry DU', 'font-size: 18px; font-weight: bold; color: #d4ff00;');
console.log('%c💼 Available for alternance in Data & AI', 'font-size: 14px; color: #a0a0a0;');


// ========== TIMELINE SCROLL ANIMATION ==========
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            timelineObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.timeline-block').forEach(block => {
    if (block.classList.contains('left')) {
        block.style.opacity = '0';
        block.style.transform = 'translateX(-50px)';
    } else {
        block.style.opacity = '0';
        block.style.transform = 'translateX(50px)';
    }
    block.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    timelineObserver.observe(block);
});

