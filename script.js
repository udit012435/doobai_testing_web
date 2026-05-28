// Sticky glass header on scroll — desktop only
(function () {
    var header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.innerWidth >= 768) {
            header.classList.toggle('scrolled', window.scrollY > 80);
        } else {
            header.classList.remove('scrolled');
        }
    });
})();

// Hamburger menu
(function () {
    var btn     = document.getElementById('hamburgerBtn');
    var nav     = document.getElementById('mobileNav');
    var overlay = document.getElementById('mobNavOverlay');
    if (!btn) return;

    function open()  { btn.classList.add('open'); nav.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
    function close() { btn.classList.remove('open'); nav.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

    btn.addEventListener('click', function () { nav.classList.contains('open') ? close() : open(); });
    overlay.addEventListener('click', close);

    document.querySelectorAll('.mob-nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            close();
            if (target) setTimeout(function () { target.scrollIntoView({ behavior: 'smooth' }); }, 340);
        });
    });
})();

const modal = document.getElementById('inviteModal');

document.getElementById('openInviteModal').addEventListener('click', function () {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

document.getElementById('closeInviteModal').addEventListener('click', closeModal);

modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Core Benefits accordion
document.querySelectorAll('.benefit-header').forEach(function (header) {
    header.addEventListener('click', function () {
        const item = this.closest('.benefit-item');
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.benefit-item.active').forEach(function (open) {
            open.classList.remove('active');
        });

        if (!isActive) item.classList.add('active');
    });
});

// Scroll animations
(function () {
    var headings = '.trust-card-title, .dev-name, .step-title';
    var contents = '.trust-card-desc, .dev-desc, .dev-best, .step-desc';

    document.querySelectorAll(headings).forEach(function (el) { el.classList.add('anim-left'); });
    document.querySelectorAll(contents).forEach(function (el) { el.classList.add('anim-right'); });

    // benefit-item has overflow:hidden so animate the whole card, not inner header
    document.querySelectorAll('.benefit-item').forEach(function (el) { el.classList.add('anim-left'); });

    ['.trust-card', '.dev-card', '.process-step'].forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (card, i) {
            var delay = (i % 3) * 100;
            card.querySelectorAll('.anim-left').forEach(function (el) { el.style.transitionDelay = delay + 'ms'; });
            card.querySelectorAll('.anim-right').forEach(function (el) { el.style.transitionDelay = (delay + 130) + 'ms'; });
        });
    });

    // benefit items stagger
    document.querySelectorAll('.benefit-item').forEach(function (el, i) {
        el.style.transitionDelay = (i * 80) + 'ms';
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.tagline-text').forEach(function (el) { el.classList.add('anim-bottom'); });

    document.querySelectorAll('.anim-left, .anim-right, .anim-bottom').forEach(function (el) { observer.observe(el); });
})();

// Investment form submission
const investmentForm = document.getElementById('investmentForm');
if (investmentForm) {
    investmentForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const successMsg = document.getElementById('successMessage');
        const errorMsg = document.getElementById('errorMessage');

        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        const data = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('countryCode').value + ' ' + document.getElementById('phoneNumber').value,
            investment: document.getElementById('investment').value,
            investmentReason: document.getElementById('investmentReason').value,
            primaryInterest: document.getElementById('primaryInterest').value,
            saledeedClient: document.getElementById('saledeedClient').value,
            developer: document.getElementById('developer').value,
        };

        try {
            const res = await fetch('submit.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                successMsg.style.display = 'block';
                investmentForm.reset();
                document.getElementById('countryCode').value = '+91';
            } else {
                throw new Error('Server error');
            }
        } catch {
            errorMsg.style.display = 'block';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Submit Application';
        }
    });
}

// Contact section form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const btn = document.getElementById('contactSubmitBtn');
        const successMsg = document.getElementById('contactSuccessMessage');
        const errorMsg = document.getElementById('contactErrorMessage');

        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';
        btn.disabled = true;
        btn.textContent = 'Submitting...';

        const data = {
            fullName: document.getElementById('c-fullName').value,
            phone: document.getElementById('c-countryCode').value + ' ' + document.getElementById('c-phoneNumber').value,
            investment: document.getElementById('c-investment').value,
            investmentReason: document.getElementById('c-investmentReason').value,
            primaryInterest: document.getElementById('c-primaryInterest').value,
            saledeedClient: document.getElementById('c-saledeedClient').value,
            developer: document.getElementById('c-developer').value,
        };

        try {
            const res = await fetch('submit.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                successMsg.style.display = 'block';
                contactForm.reset();
                document.getElementById('c-countryCode').value = '+91';
            } else {
                throw new Error('Server error');
            }
        } catch {
            errorMsg.style.display = 'block';
        } finally {
            btn.disabled = false;
            btn.textContent = 'Submit Application';
        }
    });
}
