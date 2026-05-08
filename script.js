// Custom cursor — desktop only
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-outer');
let mx = 0, my = 0, rx = 0, ry = 0;
const isTouch = window.matchMedia('(hover:none)').matches;

if (!isTouch) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
}

// Hamburger menu
const ham  = document.getElementById('hamburger');
const mNav = document.getElementById('mobileNav');

ham.addEventListener('click', () => {
  const open = ham.classList.toggle('open');
  mNav.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', open);
  mNav.setAttribute('aria-hidden', !open);
});

document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    mNav.classList.remove('open');
    ham.setAttribute('aria-expanded', 'false');
    mNav.setAttribute('aria-hidden', 'true');
  });
});

// Scroll reveal
const ro = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) x.target.classList.add('in');
  });
}, { threshold: 0.08 });
document.querySelectorAll('.rv, .rv-l').forEach(el => ro.observe(el));

// Animated skill bars
const bro = new IntersectionObserver(entries => {
  entries.forEach(x => {
    if (x.isIntersecting) {
      x.target.querySelectorAll('[data-w]').forEach(b => {
        setTimeout(() => { b.style.width = b.dataset.w + '%'; }, 300);
      });
      bro.unobserve(x.target);
    }
  });
}, { threshold: 0.2 });
const bEl = document.getElementById('bars');
if (bEl) bro.observe(bEl);

// Ambient parallax — desktop only
if (!isTouch) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth  - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    document.querySelector('.amb-1').style.transform = `translate(${x*20}px,${y*16}px)`;
    document.querySelector('.amb-2').style.transform = `translate(${-x*16}px,${-y*14}px)`;
    document.querySelector('.amb-3').style.transform = `translate(${x*10}px,${y*12}px)`;
  });
}
