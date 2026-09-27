
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if(toggle && nav){
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}
const year = document.getElementById('year');
if(year) year.textContent = new Date().getFullYear();
const slider = document.querySelector('#projecten .projects');

if (slider) {
  const slides = Array.from(slider.querySelectorAll('.project'));

  if (slides.length > 1) {
    slider.classList.add('is-slider');
    slider.setAttribute('aria-label', 'Projectfoto’s');

    slider.insertAdjacentHTML('beforeend', `
      <button class="slide-arrow slide-prev" type="button" aria-label="Vorige projectfoto">‹</button>
      <button class="slide-arrow slide-next" type="button" aria-label="Volgende projectfoto">›</button>
      <div class="slide-dots" aria-label="Kies een projectfoto"></div>
    `);

    const dotsBox = slider.querySelector('.slide-dots');
    let current = 0;
    let timer;

    slides.forEach((slide, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slide-dot';
      dot.setAttribute('aria-label', `Toon projectfoto ${i + 1}`);
      dot.addEventListener('click', () => showSlide(i));
      dotsBox.appendChild(dot);
    });

    const dots = Array.from(dotsBox.children);

    function showSlide(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((slide, n) => {
        slide.classList.toggle('active', n === current);
        slide.setAttribute('aria-hidden', String(n !== current));
        dots[n].classList.toggle('active', n === current);
        dots[n].setAttribute('aria-pressed', String(n === current));
      });
    }

    slider.querySelector('.slide-prev').addEventListener('click', () => showSlide(current - 1));
    slider.querySelector('.slide-next').addEventListener('click', () => showSlide(current + 1));

    function stopSlider() {
      clearInterval(timer);
      timer = undefined;
    }

    function startSlider() {
      if (!timer && !document.hidden &&
          !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        timer = setInterval(() => showSlide(current + 1), 5500);
      }
    }

    slider.addEventListener('mouseenter', stopSlider);
    slider.addEventListener('mouseleave', startSlider);
    slider.addEventListener('focusin', stopSlider);
    slider.addEventListener('focusout', event => {
      if (!slider.contains(event.relatedTarget)) startSlider();
    });
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stopSlider() : startSlider();
    });

    showSlide(0);
    startSlider();
  }
}
