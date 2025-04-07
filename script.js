// FAQ
document.addEventListener('click', function(e) {
    const question = e.target.closest('.faq-question');
    if (question) {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // sec reveal
    const sections = document.querySelectorAll('.executors, .modules, .developers, .faq');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // stop obs once revealed (doesnt work idk why)
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

    // smoooth operator
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

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        featureCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.getAttribute('data-description').toLowerCase();
            const matches = title.includes(searchTerm) || description.includes(searchTerm);
            card.classList.toggle('filtered-out', !matches);
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
    document.addEventListener('mousemove', (e) => {
        if (trailTimeout) clearTimeout(trailTimeout);
        
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);

        trailTimeout = setTimeout(() => trail.remove(), 1000);
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });
});
