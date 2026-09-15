const menu = document.querySelector('.hamb'), nav = document.querySelector('.nav nav'); menu?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav nav a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));
const form = document.querySelector('#contactForm'); form?.addEventListener('submit', e => { e.preventDefault(); const m = document.querySelector('#formMsg'); m.textContent = 'Thanks! Your message is ready to be connected to email/backend.'; m.style.color = '#078ff0'; form.reset(); });
document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(x => x.classList.remove('active')); b.classList.add('active'); let f = b.dataset.filter; document.querySelectorAll('.all-posts .post').forEach(p => p.style.display = f === 'all' || p.dataset.cat === f ? 'block' : 'none') }));
/* =========================================================
   EXPERIENCE COUNTER ANIMATION
========================================================= */

const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {

    const target = Number(counter.dataset.target);

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

const experienceSection = document.querySelector(".experience");

if (experienceSection && counters.length) {

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
const whySlider = document.querySelector(".why-grid");
const whyCards = document.querySelectorAll(".why-card");
const whyDots = document.querySelectorAll(".why-dot");

let whyIndex = 0;

function moveWhySlider() {

    if (!whySlider || whyCards.length === 0) return;

    whyIndex++;

    if (whyIndex >= whyCards.length) {
        whyIndex = 0;
    }

    const card = whyCards[whyIndex];

    whySlider.scrollTo({
        left: card.offsetLeft - whySlider.offsetLeft,
        behavior: "smooth"
    });

    whyDots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === whyIndex
        );
    });
}


/* Auto Slide */

setInterval(moveWhySlider, 3000);


/* Update dots when manually scrolling */

whySlider?.addEventListener("scroll", () => {

    let closest = 0;
    let smallestDistance = Infinity;

    whyCards.forEach((card, index) => {

        const distance = Math.abs(
            card.offsetLeft -
            whySlider.scrollLeft
        );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closest = index;
        }

    });

    whyDots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === closest
        );
    });

});