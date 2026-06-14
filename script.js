document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('actionButton');
  if (actionButton) {
    actionButton.addEventListener('click', () => {
      // On homepage, go to projects page
      location.href = 'projects.html';
    });
  }

  // Tabs for project lists
  const tabs = document.querySelectorAll('.project-tabs .tab');
  if (tabs && tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.dataset.target;
        document.querySelectorAll('[data-list]').forEach(list => {
          list.classList.toggle('hidden', list.dataset.list !== target);
        });
      });
    });
  }

  // Video thumbnails open modal with iframe
  const modal = document.getElementById('videoModal');
  const videoContainer = document.getElementById('videoContainer');
  const closeModal = document.getElementById('closeModal');

  const thumbs = document.querySelectorAll('.thumb');
  if (thumbs && thumbs.length && modal && videoContainer && closeModal) {
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const id = thumb.dataset.youtube;
        if (!id) return;
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        modal.classList.add('show');
        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden','false');
      });
    });

    closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      modal.classList.add('hidden');
      modal.setAttribute('aria-hidden','true');
      videoContainer.innerHTML = '';
    });
  }

  // Mailing list form (mock)
  const mailForm = document.getElementById('mailForm');
  const mailStatus = document.getElementById('mailStatus');
  if (mailForm && mailStatus) {
    mailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      mailStatus.textContent = `Thanks — we'll email ${email} with updates.`;
      mailForm.reset();
    });
  }
});
