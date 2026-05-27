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
