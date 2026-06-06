document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Particle Canvas System (Zero-Gravity Space Drift)
    // ----------------------------------------------------
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 160 };

    // Resize Canvas to fit screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 0.8;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 15;
            this.vx = (Math.random() - 0.5) * 0.3; // Slow drift velocity
            this.vy = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(155, 81, 224, ${this.opacity})`;
            ctx.fill();
        }

        update() {
            // Drifting
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            // Mouse Gravitational Pull
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    // Pull particles towards mouse (gravity theme)
                    this.x += (dx / distance) * force * 1.5;
                    this.y += (dy / distance) * force * 1.5;
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 11000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 110) {
                    let alpha = (110 - distance) / 110 * 0.12;
                    ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Draw link to mouse if close
            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let alpha = (mouse.radius - distance) / mouse.radius * 0.22;
                    ctx.strokeStyle = `rgba(155, 81, 224, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    animateParticles();


    // ----------------------------------------------------
    // 2. Interactive Orbiting Skill Bubbles
    // ----------------------------------------------------
    const bubbles = document.querySelectorAll('.skill-bubble');
    
    // Set orbit configurations
    const orbitConfig = {
        languages: { radius: 125, speed: 0.005 },
        libs: { radius: 190, speed: -0.003 }, // Reverse direction
        tools: { radius: 255, speed: 0.002 }
    };

    // Store state for each bubble
    let bubbleStates = Array.from(bubbles).map(bubble => {
        const orbitType = bubble.dataset.orbit;
        const startAngle = parseFloat(bubble.dataset.angle) * (Math.PI / 180);
        return {
            element: bubble,
            orbitType: orbitType,
            angle: startAngle,
            radius: orbitConfig[orbitType].radius,
            speed: orbitConfig[orbitType].speed,
            isHovered: false
        };
    });

    // Handle bubble hover to pause individual items
    bubbleStates.forEach(state => {
        state.element.addEventListener('mouseenter', () => {
            state.isHovered = true;
            state.element.style.transform = `translate(-50%, -50%) scale(1.25)`;
        });
        state.element.addEventListener('mouseleave', () => {
            state.isHovered = false;
        });
    });

    function updateOrbits() {
        bubbleStates.forEach(state => {
            if (!state.isHovered) {
                // Increment angle based on speed
                state.angle += state.speed;
            }
            
            // Calculate polar coordinate offsets from center (50% left, 50% top)
            const x = state.radius * Math.cos(state.angle);
            const y = state.radius * Math.sin(state.angle);
            
            // Apply coordinates to elements via transform
            if (!state.isHovered) {
                state.element.style.left = '50%';
                state.element.style.top = '50%';
                state.element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
            } else {
                // Keep the hovered translate offset, just apply scale in hover listener
                state.element.style.left = '50%';
                state.element.style.top = '50%';
                state.element.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(1.25)`;
            }
        });
        requestAnimationFrame(updateOrbits);
    }
    
    updateOrbits();


    // ----------------------------------------------------
    // 3. Project Charts Entry Animations (IntersectionObserver)
    // ----------------------------------------------------
    const projectCards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find SVGs inside project card and run animation class/reset stroke
                const svg = entry.target.querySelector('.mini-chart');
                if (svg) {
                    svg.style.animation = 'none';
                    svg.offsetHeight; // Trigger reflow
                    svg.style.animation = 'draw-chart 2.2s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        observer.observe(card);
    });


    // ----------------------------------------------------
    // 4. Contact Form Handler (Visual Packet Transmission)
    // ----------------------------------------------------
    const form = document.getElementById('portfolio-contact-form');
    const successMsg = document.getElementById('form-success-alert');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Transmitting Visual Effect
            submitBtn.textContent = 'Transmitting...';
            submitBtn.disabled = true;
            submitBtn.style.background = 'linear-gradient(135deg, rgba(255,0,127,0.3) 0%, rgba(155,81,224,0.3) 100%)';
            submitBtn.style.borderColor = 'var(--neon-pink)';
            
            setTimeout(() => {
                submitBtn.textContent = 'Transmission Complete';
                successMsg.style.display = 'block';
                form.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                }, 4000);
            }, 1800);
        });
    }


    // ----------------------------------------------------
    // 5. Active Link Highlight on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
