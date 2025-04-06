document.addEventListener('DOMContentLoaded', () => {
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