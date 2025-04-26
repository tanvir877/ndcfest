// Advanced animations with vanilla JS

document.addEventListener('DOMContentLoaded', function() {
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize tech UI elements
    initTechUIElements();
    
    // Initialize scroll triggered animations
    initScrollTriggers();
    
    // Initialize all animations
    initTechAnimations();
    
    // Initialize spec counters
    initSpecCounters();
    
    initTechCards();
    initStatBars();
    initMetricCounters();
    initTechCanvas();
});
  
// Parallax Effects
function initParallaxEffects() {
    // Hero section parallax
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (heroImage && scrollPosition <= heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
    });
    
    // Mouse move parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (heroContent) {
            heroContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
        }
        
        if (heroImage) {
            heroImage.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        }
    });
}
  
// Hover Effects
function initHoverEffects() {
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            card.addEventListener('mousemove', (e) => {
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;
                
                const rotateX = mouseY * -0.05;
                const rotateY = mouseX * 0.05;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
                
                // Dynamic lighting effect
                const intensity = Math.sqrt(Math.pow(mouseX, 2) + Math.pow(mouseY, 2)) / (cardRect.width / 2);
                const gradient = `radial-gradient(circle at ${e.clientX - cardRect.left}px ${e.clientY - cardRect.top}px, rgba(0, 255, 255, ${0.2 * intensity}), transparent 40%)`;
                
                card.style.backgroundImage = gradient;
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.backgroundImage = 'none';
            
            // Remove the mousemove event listener when leaving the card
            card.removeEventListener('mousemove', () => {});
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            if (!button.querySelector('.btn-glow')) {
                const glow = document.createElement('span');
                glow.classList.add('btn-glow');
                button.appendChild(glow);
                
                setTimeout(() => {
                    glow.style.opacity = '1';
                    glow.style.transform = 'scale(1.5)';
                }, 10);
            }
        });
        
        button.addEventListener('mouseleave', () => {
            const glow = button.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0';
                glow.style.transform = 'scale(0.5)';
                
                setTimeout(() => {
                    glow.remove();
                }, 300);
            }
        });
    });
}
  
// Tech UI Elements
function initTechUIElements() {
    // Create digital circuit pattern in the background
    createCircuitPattern();
    
    // Create tech scan line effect
    createScanLineEffect();
    
    // Add tech blinking effect to certain elements
    addBlinkingEffect();
}
  
// Circuit Pattern
function createCircuitPattern() {
    const sections = document.querySelectorAll('.hero, .features, .cta');
    
    sections.forEach(section => {
        const circuitOverlay = document.createElement('div');
        circuitOverlay.classList.add('circuit-overlay');
        circuitOverlay.style.position = 'absolute';
        circuitOverlay.style.top = '0';
        circuitOverlay.style.left = '0';
        circuitOverlay.style.width = '100%';
        circuitOverlay.style.height = '100%';
        circuitOverlay.style.pointerEvents = 'none';
        circuitOverlay.style.zIndex = '0';
        
        for (let i = 0; i < 15; i++) {
            const circuit = document.createElement('div');
            circuit.classList.add('circuit-line');
            
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            circuit.style.position = 'absolute';
            circuit.style.top = `${startY}%`;
            circuit.style.left = `${startX}%`;
            circuit.style.width = `${Math.random() * 150 + 50}px`;
            circuit.style.height = '2px';
            circuit.style.backgroundColor = 'rgba(0, 255, 255, 0.1)';
            circuit.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Add nodes
            const node1 = document.createElement('div');
            node1.classList.add('circuit-node');
            node1.style.position = 'absolute';
            node1.style.top = '-3px';
            node1.style.left = '0';
            node1.style.width = '8px';
            node1.style.height = '8px';
            node1.style.borderRadius = '50%';
            node1.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
            
            const node2 = document.createElement('div');
            node2.classList.add('circuit-node');
            node2.style.position = 'absolute';
            node2.style.top = '-3px';
            node2.style.right = '0';
            node2.style.width = '8px';
            node2.style.height = '8px';
            node2.style.borderRadius = '50%';
            node2.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
            
            circuit.appendChild(node1);
            circuit.appendChild(node2);
            circuitOverlay.appendChild(circuit);
        }
        
        section.style.position = 'relative';
        section.insertBefore(circuitOverlay, section.firstChild);
    });
}
  
// Scan Line Effect
function createScanLineEffect() {
    const body = document.body;
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    body.appendChild(scanLine);
}
  
// Blinking Effect
function addBlinkingEffect() {
    const elements = document.querySelectorAll('.highlight, .feature-title, .product-title');
    
    elements.forEach(element => {
        const random = Math.random();
        
        if (random > 0.7) {
            setInterval(() => {
                element.style.opacity = '0.7';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                }, 100);
            }, Math.random() * 5000 + 3000);
        }
    });
}
  
// Scroll Triggered Animations
function initScrollTriggers() {
    // Reveal elements on scroll
    const revealElements = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < windowHeight - revealPoint) {
                const children = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
                
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    };
    
    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    
    // Progressive counting for stats
    const stats = document.querySelectorAll('.stat-number');
    let counted = false;
    
    const countStats = () => {
        const statsSection = document.querySelector('.about-stats');
        
        if (statsSection && !counted) {
            const sectionTop = statsSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100) {
                stats.forEach(stat => {
                    const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                    const suffix = stat.textContent.replace(/[0-9]/g, '');
                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    
                    const counter = setInterval(() => {
                        count += increment;
                        
                        if (count >= target) {
                            clearInterval(counter);
                            stat.textContent = target + suffix;
                        } else {
                            stat.textContent = Math.floor(count) + suffix;
                        }
                    }, 16);
                });
                
                counted = true;
            }
        }
    };
    
    window.addEventListener('scroll', countStats);
    
    // Animate product specs on scroll
    const animateProductSpecs = () => {
        const specs = document.querySelectorAll('.spec-fill');
        
        specs.forEach(spec => {
            const specSection = spec.closest('.product-card');
            
            if (specSection) {
                const sectionTop = specSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight - 100 && !spec.classList.contains('animated')) {
                    const targetWidth = spec.style.width;
                    spec.style.width = '0';
                    
                    setTimeout(() => {
                        spec.style.transition = 'width 1s ease-out';
                        spec.style.width = targetWidth;
                        spec.classList.add('animated');
                    }, 100);
                }
            }
        });
    };
    
    window.addEventListener('scroll', animateProductSpecs);
    
    // Initial call
    animateProductSpecs();
}

// Technology Section Animations
function initTechAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const techType = item.getAttribute('data-tech');
            
            // Add specific animation based on tech type
            switch(techType) {
                case 'neural':
                    animateNeuralCluster(item);
                    break;
                case 'interface':
                    animateInterface(item);
                    break;
                case 'ai':
                    animateAI(item);
                    break;
            }
        });
    });
}

function animateNeuralCluster(item) {
    const cluster = item.querySelector('.neuron-cluster');
    const paths = item.querySelector('.signal-paths');
    
    // Reset animations
    cluster.style.animation = 'none';
    paths.style.animation = 'none';
    
    requestAnimationFrame(() => {
        cluster.style.animation = 'pulse 2s infinite';
        paths.style.animation = 'signalFlow 3s infinite';
    });
}

function animateInterface(item) {
    const board = item.querySelector('.circuit-board');
    const flow = item.querySelector('.data-flow');
    
    // Reset animations
    board.style.animation = 'none';
    flow.style.animation = 'none';
    
    requestAnimationFrame(() => {
        board.style.animation = 'circuitGlow 4s infinite';
        flow.style.animation = 'dataStream 2s infinite';
    });
}

function animateAI(item) {
    const nodes = item.querySelector('.network-nodes');
    const patterns = item.querySelector('.learning-patterns');
    
    // Reset animations
    nodes.style.animation = 'none';
    patterns.style.animation = 'none';
    
    requestAnimationFrame(() => {
        nodes.style.animation = 'nodesPulse 3s infinite';
        patterns.style.animation = 'patternShift 4s infinite';
    });
}

function initSpecCounters() {
    const specs = document.querySelectorAll('.spec-value');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseFloat(target.getAttribute('data-value'));
                animateCounter(target, value);
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    specs.forEach(spec => observer.observe(spec));
}

function animateCounter(element, targetValue) {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const initialValue = 0;
    const increment = (targetValue - initialValue) / steps;
    
    const animation = setInterval(() => {
        currentStep++;
        const currentValue = initialValue + (increment * currentStep);
        
        // Format the number based on its magnitude
        element.textContent = currentValue < 1 ? 
            currentValue.toFixed(3) : 
            currentValue.toFixed(1);
        
        if (currentStep >= steps) {
            element.textContent = targetValue;
            clearInterval(animation);
        }
    }, stepDuration);
}

function initTechCards() {
    const cards = document.querySelectorAll('.tech-card');
    
    cards.forEach(card => {
        // Add parallax effect to hologram
        card.addEventListener('mousemove', (e) => {
            const hologram = card.querySelector('.hologram');
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            hologram.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            const hologram = card.querySelector('.hologram');
            hologram.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

function initStatBars() {
    const bars = document.querySelectorAll('.stat-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percentage = bar.getAttribute('data-percentage');
                bar.style.transform = `scaleX(${percentage / 100})`;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    bars.forEach(bar => observer.observe(bar));
}

function initMetricCounters() {
    const metrics = document.querySelectorAll('.metric-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = entry.target;
                const value = parseFloat(metric.getAttribute('data-count'));
                animateMetric(metric, value);
                observer.unobserve(metric);
            }
        });
    }, { threshold: 0.5 });
    
    metrics.forEach(metric => observer.observe(metric));
}

function animateMetric(element, targetValue) {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const initialValue = 0;
    const increment = (targetValue - initialValue) / steps;
    
    const animation = setInterval(() => {
        currentStep++;
        const currentValue = initialValue + (increment * currentStep);
        
        element.textContent = currentValue < 1 ? 
            currentValue.toFixed(3) : 
            currentValue.toFixed(1);
        
        if (currentStep >= steps) {
            element.textContent = targetValue;
            clearInterval(animation);
        }
    }, stepDuration);
}

function initTechCanvas() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 246, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 246, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}