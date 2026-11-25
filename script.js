// ==========================================
  // ACTIVE NAV LINK ON CLICK & SCROLL
  // ==========================================
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navItems)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function setActiveNavLink(targetId) {
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === targetId);
    });
  }

  // Pindahkan active saat link menu diklik
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      setActiveNavLink(link.getAttribute('href'));
    });
  });

  // Update otomatis saat halaman di-scroll
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 180; // Offset agar pas dengan tinggi navbar fixed
      let currentId = '#home';

      sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop) {
          currentId = `#${sec.id}`;
        }
      });

      setActiveNavLink(currentId);
    });
  }

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const menuIcon = mobileMenu ? mobileMenu.querySelector('i') : null;

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (menuIcon) {
        if (navLinks.classList.contains('active')) {
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-xmark');
        } else {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuIcon) {
          menuIcon.classList.remove('fa-xmark');
          menuIcon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Auto Image Slider dengan Efek Geser Mulus
  const track = document.getElementById('sliderTrack');
  if (track) {
    let currentIndex = 0;
    const totalSlides = track.children.length;

    function moveToNextSlide() {
      currentIndex++;
      
      // Jika sudah sampai gambar terakhir, geser kembali dengan mulus ke gambar pertama
      if (currentIndex >= totalSlides) {
        currentIndex = 0;
      }
      
      track.style.transform = `translateX(-${currentIndex * (100 / totalSlides)}%)`;
    }

    // Gambar berganti otomatis setiap 3.5 detik dengan transisi geser
    setInterval(moveToNextSlide, 3500);
  }

});


// JS new web pages
// ==========================================
  // NAVBAR GLASS EFFECT ON SCROLL
  // ==========================================
  const navbarWrapper = document.querySelector('.navbar-glass-wrapper');

  if (navbarWrapper) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbarWrapper.classList.add('is-scrolled');
      } else {
        navbarWrapper.classList.remove('is-scrolled');
      }
    });
  }

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');
  const icon = mobileMenu ? mobileMenu.querySelector('i') : null;

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Tutup menu otomatis saat link diklik di tampilan mobile
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
});

// ==========================================
  // INTERACTIVE REVIEW / KOMEN SLIDER
  // ==========================================
  const reviewsData = [
    {
      stars: "★★★★★",
      quote: "“Honestly ruined other ready-to-wear dresses for me. The custom fit and soft satin drape feel so personal.”",
      initial: "M",
      author: "Maya R.",
      item: "custom satin midi dress"
    },
    {
      stars: "★★★★★",
      quote: "“Ordered a custom dress for a special event and it arrived right on time. Super flattering and comfortable.”",
      initial: "T",
      author: "Tasha W.",
      item: "ribbon tiered dress"
    },
    {
      stars: "★★★★★",
      quote: "“Loved how patient they were helping me pick the soft pink shade and measurements. Will definitely order again!”",
      initial: "P",
      author: "Priya S.",
      item: "custom pastel gown"
    },
    {
      stars: "★★★★★",
      quote: "“Wore it all evening and still felt light and confident. The stitching and details are genuinely sweet.”",
      initial: "J",
      author: "Jordan T.",
      item: "everyday sweetheart dress"
    }
  ];

  const activeReviewCard = document.getElementById('activeReviewCard');
  const reviewStars = document.getElementById('reviewStars');
  const reviewQuote = document.getElementById('reviewQuote');
  const reviewInitial = document.getElementById('reviewInitial');
  const reviewAuthor = document.getElementById('reviewAuthor');
  const reviewItem = document.getElementById('reviewItem');
  const reviewCounter = document.getElementById('reviewCounter');
  const prevReviewBtn = document.getElementById('prevReviewBtn');
  const nextReviewBtn = document.getElementById('nextReviewBtn');
  const reviewDots = document.querySelectorAll('.review-dot');
  const reviewStage = document.getElementById('reviewCardStage');

  if (activeReviewCard && reviewsData.length > 0) {
    let reviewIdx = 0;

    function renderReview(idx) {
      reviewIdx = (idx + reviewsData.length) % reviewsData.length;
      const item = reviewsData[reviewIdx];

      activeReviewCard.classList.add('is-switching');
      setTimeout(() => {
        if (reviewStars) reviewStars.textContent = item.stars;
        if (reviewQuote) reviewQuote.textContent = item.quote;
        if (reviewInitial) reviewInitial.textContent = item.initial;
        if (reviewAuthor) reviewAuthor.textContent = item.author;
        if (reviewItem) reviewItem.textContent = item.item;
        if (reviewCounter) reviewCounter.textContent = `${reviewIdx + 1} / ${reviewsData.length}`;

        reviewDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === reviewIdx);
        });

        activeReviewCard.classList.remove('is-switching');
      }, 150);
    }

    if (prevReviewBtn) {
      prevReviewBtn.addEventListener('click', () => renderReview(reviewIdx - 1));
    }
    if (nextReviewBtn) {
      nextReviewBtn.addEventListener('click', () => renderReview(reviewIdx + 1));
    }
    reviewDots.forEach((dot, i) => {
      dot.addEventListener('click', () => renderReview(i));
    });

    // Support swipe/drag di layar sentuh maupun mouse
    if (reviewStage) {
      let startX = 0;
      reviewStage.addEventListener('pointerdown', (e) => {
        startX = e.clientX;
      });
      reviewStage.addEventListener('pointerup', (e) => {
        const diffX = e.clientX - startX;
        if (Math.abs(diffX) > 45) {
          if (diffX < 0) renderReview(reviewIdx + 1);
          else renderReview(reviewIdx - 1);
        }
      });
    }
  }

const card = document.getElementById('activeReviewCard');
if (card) {
  let startX = 0, deltaX = 0, dragging = false;

  card.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    card.classList.add('is-dragging');
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    card.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.03}deg)`;
  });

  card.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('is-dragging');
    try { card.releasePointerCapture(e.pointerId); } catch (_) {}

    if (Math.abs(deltaX) > 60) {
      // Panggil fungsi ganti data komentarmu di sini (next jika deltaX < 0, prev jika deltaX > 0)
      card.style.transform = `translateX(${deltaX < 0 ? -30 : 30}px)`;
      setTimeout(() => { card.style.transform = 'translateX(0px)'; }, 150);
    } else {
      card.style.transform = 'translateX(0px)';
    }
    deltaX = 0;
  });
}