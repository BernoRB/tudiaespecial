// Intersection Observer para fade-in
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Trigger inicial para elementos ya visibles
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
}, 100);

// FAQ toggle
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// Feature toggle
function toggleFeature(el) {
  const details = el.querySelector('.feature-details');
  const isOpen = details.style.display === 'block';
  details.style.display = isOpen ? 'none' : 'block';
  el.classList.toggle('active');
}

// Carousel functionality
const carouselPositions = {
  quinces: 0,
  bodas: 0,
  bautismos: 0,
  peques: 0,
  ninos: 0,
  eventos: 0
};

function moveCarousel(carouselId, direction) {
  const track = document.getElementById(`${carouselId}-track`);
  if (!track) return;
  
  const itemWidth = 296; // 280px + 16px gap
  const scrollAmount = itemWidth * direction;
  
  track.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}
