
/* =========================================================
   MOBILE NAVIGATION MENU
========================================================= */

const menu = document.querySelector('.hamb');
const nav = document.querySelector('.nav nav');

menu?.addEventListener('click', () => {
    nav?.classList.toggle('open');
});

document.querySelectorAll('.nav nav a').forEach(a => {
    a.addEventListener('click', () => {
        nav?.classList.remove('open');
    });
});


/* =========================================================
   CONTACT FORM — QUEBENIX TECHNOLOGY
========================================================= */

const form = document.querySelector('#contactForm');

form?.addEventListener('submit', e => {
    e.preventDefault();

    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const sender = String(data.get('email') || '').trim();
    const service = String(
        data.get('service') || 'General Inquiry'
    ).trim();

    const messageField = form.querySelector(
        'textarea[name="message"]'
    );

    const message = messageField
        ? String(messageField.value || '').trim()
        : '';

    // Email subject
    const subject = encodeURIComponent(
        `Quebenix Technology Inquiry — ${service}`
    );

    // Email body
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Contact Email: ${sender}\n` +
        `Project/Service: ${service}\n\n` +
        `Message:\n${message || 'Please contact me to discuss this project.'}`
    );

    const formMsg = document.querySelector('#formMsg');

    // Show status message
    if (formMsg) {
        formMsg.textContent =
            'Opening your email app. Please press Send to submit your inquiry.';
        formMsg.style.color = '#078ff0';
    }

    // Open the default email application
    window.location.href =
        `mailto:quebenixtechnology4@gmail.com?subject=${subject}&body=${body}`;

    // Clear all form fields
    form.reset();
});


/* =========================================================
   BLOG POST FILTER
========================================================= */

document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {

        document.querySelectorAll('[data-filter]').forEach(item => {
            item.classList.remove('active');
        });

        button.classList.add('active');

        const filter = button.dataset.filter;

        document.querySelectorAll('.all-posts .post').forEach(post => {
            post.style.display =
                filter === 'all' || post.dataset.cat === filter
                    ? 'block'
                    : 'none';
        });
    });
});


/* =========================================================
   EXPERIENCE COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll('.counter');

const startCounter = counter => {

    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target) || target < 0) return;

    let current = 0;

    const duration = 1800;
    const increment = target / (duration / 20);

    const updateCounter = () => {

        current += increment;

        if (current < target) {
            counter.textContent = Math.floor(current);
            setTimeout(updateCounter, 20);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};


/* Start counting when Experience section becomes visible */

const experienceSection = document.querySelector('.experience');

if (
    experienceSection &&
    counters.length &&
    'IntersectionObserver' in window
) {

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    counters.forEach(counter => {
                        startCounter(counter);
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    counterObserver.observe(experienceSection);
}


/* =========================================================
   WHY CHOOSE US SLIDER
========================================================= */

const whySlider = document.querySelector('.why-grid');
const whyCards = document.querySelectorAll('.why-card');
const whyDots = document.querySelectorAll('.why-dot');

let whyIndex = 0;
let whyAutoSlide;

/* Move to the next card */

function moveWhySlider() {

    if (!whySlider || whyCards.length === 0) return;

    whyIndex++;

    if (whyIndex >= whyCards.length) {
        whyIndex = 0;
    }

    const card = whyCards[whyIndex];

    whySlider.scrollTo({
        left: card.offsetLeft - whySlider.offsetLeft,
        behavior: 'smooth'
    });

    updateWhyDots(whyIndex);
}


/* Update active slider dots */

function updateWhyDots(activeIndex) {

    whyDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
    });
}


/* Automatic slide */

if (whySlider && whyCards.length > 1) {

    whyAutoSlide = setInterval(moveWhySlider, 3000);

}


/* Update dots when manually scrolling */

whySlider?.addEventListener('scroll', () => {

    let closest = 0;
    let smallestDistance = Infinity;

    whyCards.forEach((card, index) => {

        const distance = Math.abs(
            card.offsetLeft - whySlider.scrollLeft
        );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closest = index;
        }
    });

    whyIndex = closest;
    updateWhyDots(closest);

});
