document.addEventListener('DOMContentLoaded', () => {
  const actionButton = document.getElementById('actionButton');
  if (actionButton) {
    actionButton.addEventListener('click', () => {
      //on homepage go to projects
      location.href = '/projects';
    });
  }

  //tabs for project lists
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

  //video thumbails
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

  //bug report form handler
  const mailForm = document.getElementById('mailForm');
  const mailStatus = document.getElementById('mailStatus');
  if (mailForm && mailStatus) {
    mailForm.addEventListener('submit', (e) => {
      e.preventDefault();

      //if bug reports exist compose with certain fields
      const bugGameEl = document.getElementById('bugGame');
      if (bugGameEl) {
        const reporterEmail = document.getElementById('reporterEmail')?.value || '';
        const bugGame = bugGameEl.value.trim();
        const bugLocation = document.getElementById('bugLocation')?.value.trim() || '';
        const bugDescription = document.getElementById('bugDescription')?.value.trim() || '';
        const bugSteps = document.getElementById('bugSteps')?.value.trim() || '';

        const to = 'contact@cobrachickenstudio.ca';
        const subject = `Bug Report: ${bugGame}`;
        const bodyLines = [
          `Reporter Email: ${reporterEmail}`,
          `Game: ${bugGame}`,
          `Approximate location: ${bugLocation}`,
          `Description:\n${bugDescription}`,
          `Reproduction steps:\n${bugSteps}`
        ];
        const body = encodeURIComponent(bodyLines.join('\n\n'));
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

        mailStatus.textContent = 'Opening your mail client to send the report...';
        //open users mail app with premade email from their bug outline thing
        window.location.href = mailto;
        return;
      }

      //simple mail list behaviour (old version)
      const emailEl = document.getElementById('email');
      const email = emailEl ? emailEl.value : '';
      mailStatus.textContent = email ? `Thanks — we'll email ${email} with updates.` : 'Thanks!';
      mailForm.reset();
    });
  }

  //tag filter for projects page
  const tagSelect = document.getElementById('tagFilterSelect');
  const projectCards = document.querySelectorAll('.project-grid .card');
  if (tagSelect && projectCards.length) {
    const tags = new Set();
    projectCards.forEach((card) => {
      const spanTags = card.querySelectorAll('.tags span');
      const cardTags = Array.from(spanTags).map((span) => span.textContent.trim());
      if (cardTags.length) {
        card.dataset.tags = cardTags.map((tag) => tag.toLowerCase()).join('|');
        cardTags.forEach((tag) => tags.add(tag));
      }
    });

    const sortedTags = Array.from(tags).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    tagSelect.innerHTML = `<option value="all" selected>All</option>` + sortedTags
      .map((tag) => `<option value="${tag.toLowerCase()}">${tag}</option>`)
      .join('');

    //initial visual state 
    tagSelect.value = 'all';
    tagSelect.classList.remove('has-selection');

    tagSelect.addEventListener('change', () => {
      const filter = tagSelect.value;
      //toggle pill selection when all is selected
      if (filter && filter !== 'all') {
        tagSelect.classList.add('has-selection');
      } else {
        tagSelect.classList.remove('has-selection');
      }

      projectCards.forEach((card) => {
        const tagsValue = card.dataset.tags || '';
        card.classList.toggle('hidden', filter !== 'all' && !tagsValue.includes(filter));
      });
    });
  }

  //mobile responsiveness
  const headerRow = document.querySelector('.site-header .header-row');
  const nav = document.querySelector('.site-header .main-nav');
  if (headerRow && nav) {
    const menuToggle = document.createElement('button');
    menuToggle.type = 'button';
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    headerRow.insertBefore(menuToggle, nav);

    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
    });

    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('open')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  }
});
