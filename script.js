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
