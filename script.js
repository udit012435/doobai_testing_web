// Sticky navbar after hero section ends
(function () {
    var header = document.querySelector('header');
    var hero   = document.getElementById('home');

    window.addEventListener('scroll', function () {
        var heroBottom = hero ? hero.offsetHeight : window.innerHeight;
        header.classList.toggle('scrolled', window.scrollY >= heroBottom);
    });
})();

// Hide navbar when footer is visible
(function () {
    var header = document.querySelector('header');
    var footer = document.querySelector('.site-footer');
    if (!header || !footer) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            header.classList.toggle('nav-hidden', entry.isIntersecting);
        });
    }, { threshold: 0.05 });

    observer.observe(footer);
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

    var closeBtn = document.getElementById('mobNavClose');
    if (closeBtn) closeBtn.addEventListener('click', close);

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

// Privacy Policy Modal
const privacyModal = document.getElementById('privacyModal');
document.getElementById('openPrivacyModal').addEventListener('click', function (e) {
    e.preventDefault();
    privacyModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});
document.getElementById('closePrivacyModal').addEventListener('click', function () {
    privacyModal.classList.remove('active');
    document.body.style.overflow = '';
});
privacyModal.addEventListener('click', function (e) {
    if (e.target === privacyModal) {
        privacyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Investment Disclaimers Modal
const disclaimerModal = document.getElementById('disclaimerModal');
document.getElementById('openDisclaimerModal').addEventListener('click', function (e) {
    e.preventDefault();
    disclaimerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});
document.getElementById('closeDisclaimerModal').addEventListener('click', function () {
    disclaimerModal.classList.remove('active');
    document.body.style.overflow = '';
});
disclaimerModal.addEventListener('click', function (e) {
    if (e.target === disclaimerModal) {
        disclaimerModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

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

// Custom Select — converts all .form-group select elements
(function () {
    function buildChevron() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "cs-chevron");
        svg.setAttribute("viewBox", "0 0 14 9");
        svg.setAttribute("fill", "none");
        var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", "M1 1l6 6 6-6");
        p.setAttribute("stroke", "currentColor");
        p.setAttribute("stroke-width", "1.8");
        p.setAttribute("stroke-linecap", "round");
        p.setAttribute("stroke-linejoin", "round");
        svg.appendChild(p);
        return svg;
    }

    function closeAll(except) {
        document.querySelectorAll(".cs-wrap.open").forEach(function (w) {
            if (w !== except) {
                w.classList.remove("open");
                w.querySelector(".cs-trigger").setAttribute("aria-expanded", "false");
                var fg = w.closest(".form-group");
                if (fg) fg.style.zIndex = "";
            }
        });
    }

    document.querySelectorAll(".form-group select").forEach(function (sel) {
        var isCountry = !!sel.closest(".country-code-wrapper");
        var placeholder = sel.querySelector("option[value=\"\"]");
        var placeholderText = placeholder ? placeholder.textContent.trim() : "Select...";

        var wrap = document.createElement("div");
        wrap.className = "cs-wrap" + (isCountry ? " cs-country-wrap" : "");

        var trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "cs-trigger";
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");

        var valEl = document.createElement("span");
        valEl.className = "cs-val";
        var selectedOpt = sel.querySelector("option:checked");
        if (selectedOpt && selectedOpt.value !== "") {
            valEl.textContent = selectedOpt.textContent.trim();
        } else {
            valEl.textContent = placeholderText;
            valEl.classList.add("cs-placeholder");
        }

        trigger.appendChild(valEl);
        trigger.appendChild(buildChevron());

        var panel = document.createElement("div");
        panel.className = "cs-panel";
        panel.setAttribute("role", "listbox");

        var optionsContainer;

        if (isCountry) {
            var inner = document.createElement("div");
            inner.className = "cs-country-panel-inner";
            var searchWrap = document.createElement("div");
            searchWrap.className = "cs-search-wrap";
            var searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.className = "cs-search-input";
            searchInput.placeholder = "Search country...";
            searchWrap.appendChild(searchInput);
            inner.appendChild(searchWrap);
            optionsContainer = document.createElement("div");
            optionsContainer.className = "cs-options-scroll";
            inner.appendChild(optionsContainer);
            panel.appendChild(inner);
        } else {
            optionsContainer = document.createElement("div");
            optionsContainer.className = "cs-options-plain";
            panel.appendChild(optionsContainer);
        }

        Array.from(sel.options).forEach(function (opt) {
            if (opt.value === "") return;
            var div = document.createElement("div");
            div.className = "cs-option" + (opt.selected && opt.value !== "" ? " selected" : "");
            div.dataset.value = opt.value;
            div.setAttribute("role", "option");
            div.textContent = opt.textContent.trim();
            optionsContainer.appendChild(div);
        });

        wrap.appendChild(trigger);
        wrap.appendChild(panel);
        sel.parentNode.insertBefore(wrap, sel);
        sel.style.display = "none";

        var formGroup = wrap.closest(".form-group");

        trigger.addEventListener("click", function (e) {
            e.stopPropagation();
            if (wrap.classList.contains("open")) {
                wrap.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
                if (formGroup) formGroup.style.zIndex = "";
            } else {
                closeAll(wrap);
                wrap.classList.add("open");
                trigger.setAttribute("aria-expanded", "true");
                if (formGroup) formGroup.style.zIndex = "1000";
                if (isCountry) {
                    setTimeout(function () { panel.querySelector(".cs-search-input").focus(); }, 40);
                }
            }
        });

        optionsContainer.querySelectorAll(".cs-option").forEach(function (opt) {
            opt.addEventListener("click", function (e) {
                e.stopPropagation();
                valEl.textContent = opt.textContent;
                valEl.classList.remove("cs-placeholder");
                sel.value = opt.dataset.value;
                sel.dispatchEvent(new Event("change"));
                optionsContainer.querySelectorAll(".cs-option").forEach(function (o) { o.classList.remove("selected"); });
                opt.classList.add("selected");
                wrap.classList.remove("open");
                trigger.setAttribute("aria-expanded", "false");
                if (formGroup) formGroup.style.zIndex = "";
            });
        });

        if (isCountry) {
            var si = panel.querySelector(".cs-search-input");
            var sc = panel.querySelector(".cs-options-scroll");
            si.addEventListener("input", function () {
                var q = this.value.toLowerCase();
                sc.querySelectorAll(".cs-option").forEach(function (o) {
                    o.style.display = o.textContent.toLowerCase().includes(q) ? "" : "none";
                });
            });
            si.addEventListener("click", function (e) { e.stopPropagation(); });
        }
    });

    document.addEventListener("click", function () { closeAll(); });
})();
