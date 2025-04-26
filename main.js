document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Header scroll effect with parallax
    const header = document.querySelector('.header');
    const scrollThreshold = 100;
  
    window.addEventListener('scroll', () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Enhanced form submission with animation
    const form = document.querySelector('.contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Add loading animation
        submitButton.innerHTML = '<span class="loading-dots">Sending<span>.</span><span>.</span><span>.</span></span>';
        submitButton.disabled = true;
        submitButton.classList.add('loading');
  
        setTimeout(() => {
          form.reset();
          submitButton.innerHTML = '<span class="success-message">✓ Message Sent!</span>';
          submitButton.classList.remove('loading');
          submitButton.classList.add('success');
          
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('success');
          }, 2000);
        }, 1500);
      });
    }
  
    // Enhanced Intersection Observer for fade-in animations with stagger effect
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay based on element index
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);
  
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach((el, index) => {
      el.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(el);
    });

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;

      // Parallax for hero section
      const heroContent = document.querySelector('.hero .container');
      if (heroContent) {
        heroContent.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
      }

      // Parallax for feature cards
      document.querySelectorAll('.feature').forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const distanceX = (e.clientX - cardCenterX) / window.innerWidth;
        const distanceY = (e.clientY - cardCenterY) / window.innerHeight;
        
        card.style.transform = `perspective(1000px) rotateY(${distanceX * 5}deg) rotateX(${-distanceY * 5}deg) translateZ(10px)`;
      });
    });

    // Reset transforms when mouse leaves
    document.addEventListener('mouseleave', () => {
      const heroContent = document.querySelector('.hero .container');
      if (heroContent) {
        heroContent.style.transform = 'translate(0, 0)';
      }

      document.querySelectorAll('.feature').forEach(card => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
      });
    });

    // Animate stats when in viewport
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          animateValue(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Number animation function
    function animateValue(element) {
      const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
      const suffix = element.textContent.replace(/[0-9]/g, '');
      let current = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const animate = () => {
        current += increment;
        if (current >= target) {
          element.textContent = target + suffix;
        } else {
          element.textContent = Math.floor(current) + suffix;
          requestAnimationFrame(animate);
        }
      };

      animate();
    }

    // Add magnetic effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.transform = `translate(${(x - rect.width / 2) / 10}px, ${(y - rect.height / 2) / 10}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
});

// Add loading dots animation styles
const style = document.createElement('style');
style.textContent = `
  .loading-dots span {
    animation: loadingDots 1.5s infinite;
    opacity: 0;
    display: inline-block;
    margin-left: 2px;
  }

  .loading-dots span:nth-child(1) { animation-delay: 0s; }
  .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
  .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes loadingDots {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }

  .btn.loading {
    background: var(--color-primary);
    opacity: 0.8;
  }

  .btn.success {
    background: #00ff00;
    color: var(--color-bg);
  }

  .success-message {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
`;
document.head.appendChild(style);