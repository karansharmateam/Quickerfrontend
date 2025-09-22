document.addEventListener('DOMContentLoaded', function() {
    
    // --- NAVIGATION ---
    const mobileMenu = document.getElementById('mobileMenu');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Set active navigation link
    function handleActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    handleActiveNavLink();


    // --- FORM HANDLING ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            alert(`Thank you, ${name}! Your message has been sent.`);
            this.reset();
        });
    }

    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            if (!formData.get('bookTerms')) {
                alert('Please agree to the Terms of Service to continue.');
                return;
            }
            const service = formData.get('bookService');
            const date = formData.get('bookDate');
            alert(`Booking confirmed for ${service} on ${date}! We will send a confirmation email.`);
            this.reset();
        });
    }

    // --- ANIMATIONS & DYNAMIC CONTENT ---
    const animatedElements = document.querySelectorAll('.service-card, .contact-form, .image-placeholder, .about-content > div');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Set minimum date for booking to today
    const bookDateInput = document.getElementById('bookDate');
    if (bookDateInput) {
        bookDateInput.min = new Date().toISOString().split('T')[0];
    }
});