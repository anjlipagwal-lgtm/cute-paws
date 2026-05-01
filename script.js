document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Bar with Smooth Scrolling
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // 3. Cute Pet Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-src');
            if(imgSrc) {
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 4. Fun Pet Facts Section
    const facts = [
        "Cats have 32 muscles in each ear, allowing them to swivel 180 degrees! 🐱",
        "Dogs' sense of smell is at least 40x better than ours! 🐶",
        "Rabbits can literally die of fright if they get too scared. Be gentle! 🐰",
        "Hamsters can store up to half their body weight in their cheeks! 🐹",
        "Parrots are the only birds that can eat with their feet! 🦜",
        "A dog's nose print is as unique as a human fingerprint! 🐾",
        "Cats sleep for 70% of their lives. That's a lot of catnaps! 😴",
        "Goldfish can live for over 40 years if well cared for! 🐟"
    ];

    const factDisplay = document.getElementById('fact-display');
    const factBtn = document.getElementById('fact-btn');

    factBtn.addEventListener('click', () => {
        // Add animation class
        factDisplay.style.opacity = '0';
        factDisplay.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            factDisplay.textContent = randomFact;
            
            factDisplay.style.transition = 'all 0.3s ease';
            factDisplay.style.opacity = '1';
            factDisplay.style.transform = 'translateY(0)';
        }, 300);
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Reset errors
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
        
        if (name.value.trim() === '') {
            name.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (email.value.trim() === '' || !/^\S+@\S+\.\S+$/.test(email.value)) {
            email.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (message.value.trim() === '') {
            message.parentElement.classList.add('error');
            isValid = false;
        }
        
        if (isValid) {
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                const successMsg = document.getElementById('form-success');
                successMsg.style.display = 'block';
                
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 5000);
            }, 1500);
        }
    });

    // Handle Read More buttons
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.parentElement;
            const p = card.querySelector('p');
            if (this.textContent === 'Read More') {
                this.textContent = 'Read Less';
                p.style.whiteSpace = 'normal';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
});
