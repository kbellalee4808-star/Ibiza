// =====================================================
// Smooth Scrolling
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// Back to Top Button
// =====================================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =====================================================
// Scroll Animations
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.city-card, .timeline-item, .pricing-card, .stat-item, .inclusions-box, .benefit-item'
    );
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
};

// Initialize animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// =====================================================
// City Card Hover Effects
// =====================================================
const cityCards = document.querySelectorAll('.city-card');

cityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// =====================================================
// Booking Form Validation & Submission
// =====================================================
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            passengers: document.getElementById('passengers').value,
            cabin: document.getElementById('cabin').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.passengers || !formData.cabin) {
            showNotification('모든 필수 항목을 입력해주세요.', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            showNotification('올바른 이메일 주소를 입력해주세요.', 'error');
            return;
        }
        
        // Phone validation (basic)
        const phonePattern = /^[0-9-+().\s]+$/;
        if (!phonePattern.test(formData.phone)) {
            showNotification('올바른 전화번호를 입력해주세요.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 전송 중...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Booking inquiry submitted:', formData);
            
            // Show success message
            showNotification('예약 문의가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.', 'success');
            
            // Reset form
            bookingForm.reset();
            
            // Restore button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// =====================================================
// Notification System
// =====================================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 20px 25px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            min-width: 300px;
            max-width: 500px;
            animation: slideInRight 0.4s ease;
        }
        
        .notification-success {
            border-left: 4px solid #27AE60;
        }
        
        .notification-error {
            border-left: 4px solid #E74C3C;
        }
        
        .notification-info {
            border-left: 4px solid #3498DB;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 15px;
            flex: 1;
        }
        
        .notification-content i {
            font-size: 1.5rem;
        }
        
        .notification-success .notification-content i {
            color: #27AE60;
        }
        
        .notification-error .notification-content i {
            color: #E74C3C;
        }
        
        .notification-info .notification-content i {
            color: #3498DB;
        }
        
        .notification-content span {
            color: #2C3E50;
            font-size: 1rem;
            line-height: 1.5;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #7F8C8D;
            cursor: pointer;
            padding: 5px;
            transition: color 0.3s ease;
        }
        
        .notification-close:hover {
            color: #2C3E50;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 10px;
                left: 10px;
                min-width: auto;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', 'true');
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => notification.remove(), 400);
        }
    }, 5000);
}

// =====================================================
// Form Highlight Effect
// =====================================================
const style = document.createElement('style');
style.textContent = `
    .booking-form.highlight {
        animation: pulseHighlight 1s ease 2;
    }
    
    @keyframes pulseHighlight {
        0%, 100% {
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        50% {
            box-shadow: 0 8px 48px rgba(52, 152, 219, 0.6);
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// Timeline Animation on Scroll
// =====================================================
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

// =====================================================
// Parallax Effect for Hero Section
// =====================================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// =====================================================
// Dynamic Year in Footer
// =====================================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear && footerYear.textContent.includes('2026')) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// =====================================================
// Mobile Menu Toggle (if needed in future)
// =====================================================
// Placeholder for mobile navigation if header navigation is added

// =====================================================
// Image Lazy Loading Enhancement
// =====================================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// =====================================================
// Console Welcome Message
// =====================================================
console.log('%c🚢 Valiant Lady Cruise', 'font-size: 24px; color: #3498DB; font-weight: bold;');
console.log('%cAmalfi Coast, Cannes & Ibiza', 'font-size: 16px; color: #2C3E50;');
console.log('%c6박 7일 지중해 크루즈 여행', 'font-size: 14px; color: #7F8C8D;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #ECF0F1;');
console.log('Website developed with ❤️');

// =====================================================
// Performance Monitoring (Optional)
// =====================================================
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// =====================================================
// Accessibility: Focus Visible Enhancement
// =====================================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus styles for keyboard navigation
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 3px solid #3498DB !important;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// =====================================================
// Print Styles Enhancement
// =====================================================
window.addEventListener('beforeprint', () => {
    console.log('Preparing page for printing...');
    // Add any print-specific adjustments here
});

// =====================================================
// Error Handling for External Resources
// =====================================================
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Optionally set a fallback image
        // e.target.src = '/images/placeholder.jpg';
    }
}, true);

// =====================================================
// Initialize Application
// =====================================================
console.log('✅ Application initialized successfully');
