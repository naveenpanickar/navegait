// navegait EPX — Components & Interactions

// Scroll nav effect
window.addEventListener('scroll', () => {
  document.querySelector('.topbar')?.classList.toggle('scrolled', window.scrollY > 20);
});

// Progress ring fill (conic gradient)
document.querySelectorAll('.prog-ring').forEach(ring => {
  const pct = ring.dataset.pct || 75;
  ring.style.background = `conic-gradient(var(--blue) ${pct}%, var(--border) 0%)`;
});

// Bar chart animation on scroll
const bars = document.querySelectorAll('.bar-fill');
if (bars.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'height .6s cubic-bezier(.4,0,.2,1)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  bars.forEach(b => io.observe(b));
}

// Score bar animation
document.querySelectorAll('.sb-fill-inner').forEach(el => {
  const w = el.style.width;
  el.style.width = '0';
  setTimeout(() => {
    el.style.transition = 'width .8s cubic-bezier(.4,0,.2,1)';
    el.style.width = w;
  }, 200);
});

// Active sidebar highlight based on current page
const page = window.location.pathname.split('/').pop();
document.querySelectorAll('.sidebar-item').forEach(item => {
  if (item.href && item.href.includes(page)) item.classList.add('active');
});

// Vertical pill highlight
document.querySelectorAll('.vert-pill').forEach(pill => {
  if (pill.href && pill.href.includes(page)) pill.classList.add('active');
});

// Staggered card entrance
const cards = document.querySelectorAll('.kpi-card, .module-card, .prog-card, .vs-card');
const cardIO = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      cardIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
cards.forEach((c, i) => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition = `opacity .4s ${i*0.06}s, transform .4s ${i*0.06}s`;
  cardIO.observe(c);
});
