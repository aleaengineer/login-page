document.addEventListener('DOMContentLoaded', function() {
    // Form submission animation
    const loginForm = document.querySelector('.login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const email = document.getElementById('emailInput').value;
        const password = document.getElementById('passwordInput').value;
        
        // Validate form (basic validation)
        if (email && password) {
            // Add loading animation
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Signing in...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i> Success!';
                submitBtn.classList.remove('btn-primary');
                submitBtn.classList.add('btn-success');
                
                // Redirect or show success message
                setTimeout(() => {
                    // Reset form for demo purposes
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('btn-success');
                    submitBtn.classList.add('btn-primary');
                    loginForm.reset();
                }, 2000);
            }, 2000);
        }
    });
    
    // Input field animations
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        // Remove focus animation
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });
    
    // Add floating particles in the background
    createParticles();
    
    // Handle responsive layout changes
    handleResponsiveLayout();
    
    // Listen for window resize events
    window.addEventListener('resize', handleResponsiveLayout);
});

// Create floating particles
function createParticles() {
    const loginSection = document.querySelector('.login-section');
    
    // Clear existing particles first
    const existingParticles = document.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Determine number of particles based on screen size
    let particleCount = 20;
    if (window.innerWidth < 768) {
        particleCount = 10;
    } else if (window.innerWidth >= 1400) {
        particleCount = 30;
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random styling
        const size = Math.random() * 10 + (window.innerWidth < 768 ? 3 : 5);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = 'rgba(255, 255, 255, ' + (Math.random() * 0.1 + 0.05) + ')';
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = 'float ' + (Math.random() * 10 + 10) + 's linear infinite';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.zIndex = '0';
        
        // Add to login section
        loginSection.appendChild(particle);
    }
}

// Handle responsive layout changes
function handleResponsiveLayout() {
    const heroSection = document.querySelector('.hero-section');
    const loginSection = document.querySelector('.login-section');
    const row = document.querySelector('.row');
    
    // For mobile view (less than 768px)
    if (window.innerWidth < 768) {
        // Adjust hero content for mobile
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.remove('display-3');
            heroTitle.classList.add('display-4');
        }
        
        // If we're in mobile view, make sure the sections are in the right order
        if (window.innerWidth < 576) {
            heroSection.style.order = '2';
            loginSection.style.order = '1';
        }
    } else {
        // Reset for larger screens
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.classList.remove('display-4');
            heroTitle.classList.add('display-3');
        }
        
        // Reset order for larger screens
        heroSection.style.order = '';
        loginSection.style.order = '';
    }
    
    // Recreate particles when screen size changes
    createParticles();
}

// Add floating animation CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes float {
    0% {
        transform: translateY(0) translateX(0);
    }
    25% {
        transform: translateY(-20px) translateX(10px);
    }
    50% {
        transform: translateY(-40px) translateX(0);
    }
    75% {
        transform: translateY(-20px) translateX(-10px);
    }
    100% {
        transform: translateY(0) translateX(0);
    }
}

.input-focused {
    transform: scale(1.02);
}

/* Additional responsive styles */
@media (max-width: 575.98px) {
    .particle {
        display: none; /* Hide particles on very small screens for better performance */
    }
}
</style>
`);
