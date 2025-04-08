

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    document.body.appendChild(darkModeToggle);

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }

    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    const sections = document.querySelectorAll('.executors, .modules, .developers, .faq');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        sectionObserver.observe(section);
    });

    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            const section = document.querySelector(`.${sectionId}`);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const searchInput = document.getElementById('moduleSearch');
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach((card, index) => {
        card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        card.style.transitionDelay = `${index * 0.05}s`;
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        featureCards.forEach((card, index) => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.getAttribute('data-description')?.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            
            card.style.transform = matches ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)';
            card.style.opacity = matches ? '1' : '0.3';
            card.style.pointerEvents = matches ? 'auto' : 'none';
            card.style.filter = matches ? 'none' : 'grayscale(50%)';
            card.style.transitionDelay = matches ? `${index * 0.05}s` : '0s';
        });
    });

    const modal = document.getElementById('moduleModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');

    featureCards.forEach(card => {
        card.addEventListener('click', () => {
            modalTitle.textContent = card.querySelector('h3').textContent;
            modalDescription.textContent = card.getAttribute('data-description');
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('active'), 10);

            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${event.clientX - card.getBoundingClientRect().left}px`;
            ripple.style.top = `${event.clientY - card.getBoundingClientRect().top}px`;
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    });

    let trailTimeout;
    let trailCount = 0;
    const trailColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96f2d7', '#ffd93d'];
    const trailPatterns = ['circle', 'square', 'triangle', 'star'];
    
    document.addEventListener('mousemove', (e) => {
        if (trailTimeout) clearTimeout(trailTimeout);
        
        const trail = document.createElement('div');
        trail.className = `cursor-trail ${trailPatterns[trailCount % trailPatterns.length]}`;
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        trail.style.backgroundColor = trailColors[trailCount % trailColors.length];
        document.body.appendChild(trail);

        trailCount++;
        trailTimeout = setTimeout(() => trail.remove(), 1000);
    });

    document.addEventListener('click', () => {
        trailCount = Math.floor(Math.random() * trailColors.length);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    document.addEventListener('click', function(e) {
        const question = e.target.closest('.faq-question');
        if (question) {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            // hight calc
            setTimeout(() => {
                if (!faqItem.classList.contains('active')) {
                    faqItem.classList.add('active');
                    answer.style.maxHeight = `${answer.scrollHeight + 20}px`; // padding
                    answer.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
                    answer.style.opacity = '1';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.opacity = '0';
                    faqItem.classList.remove('active');
                }
            }, 10);
        }
    });
});
