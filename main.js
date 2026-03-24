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

/* =====================================================
   Global Styles & CSS Variables
   ===================================================== */
:root {
    --primary-color: #2C3E50;
    --secondary-color: #3498DB;
    --accent-color: #E74C3C;
    --gold-color: #F39C12;
    --success-color: #27AE60;
    --light-bg: #ECF0F1;
    --dark-text: #2C3E50;
    --light-text: #7F8C8D;
    --white: #FFFFFF;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-ocean: linear-gradient(135deg, #2E86AB 0%, #A23B72 100%);
    --gradient-sunset: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.6;
    color: var(--dark-text);
    background-color: var(--white);
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* =====================================================
   Hero Section
   ===================================================== */
.hero {
    position: relative;
    height: 100vh;
    min-height: 600px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--white);
    overflow: hidden;
}

.hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1920&h=1080&fit=crop') center/cover;
    z-index: 1;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%);
    z-index: 2;
}

.hero-content {
    position: relative;
    z-index: 3;
    animation: fadeInUp 1s ease;
}

.hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 24px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-title {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: -1px;
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 30px;
    opacity: 0.95;
    font-weight: 300;
}

.hero-dates {
    font-size: 1.1rem;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: var(--white);
    color: var(--primary-color);
    padding: 18px 48px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    transition: var(--transition);
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    animation: bounce 2s infinite;
    font-size: 2rem;
    opacity: 0.8;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
}

/* =====================================================
   Quick Info Bar
   ===================================================== */
.quick-info {
    background: var(--white);
    box-shadow: var(--shadow-md);
    position: relative;
    z-index: 10;
    margin-top: -50px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 30px 0;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: var(--light-bg);
    border-radius: 12px;
    transition: var(--transition);
}

.info-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
}

.info-item i {
    font-size: 2.5rem;
    color: var(--secondary-color);
}

.info-content {
    display: flex;
    flex-direction: column;
}

.info-label {
    font-size: 0.9rem;
    color: var(--light-text);
    font-weight: 400;
}

.info-value {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dark-text);
}

/* =====================================================
   Section Headers
   ===================================================== */
.section-header {
    text-align: center;
    margin-bottom: 60px;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--light-text);
    font-weight: 400;
}

/* =====================================================
   Route Section
   ===================================================== */
.route-section {
    padding: 80px 0;
    background: linear-gradient(to bottom, var(--white) 0%, var(--light-bg) 100%);
}

.route-map {
    margin-top: 40px;
}

.map-visual {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: var(--shadow-lg);
    margin-bottom: 40px;
}

.map-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
}
}

.route-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.route-cities {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.city-card {
    background: var(--white);
    padding: 0;
    border-radius: 16px;
    text-align: center;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
    border: 2px solid transparent;
    overflow: hidden;
}

.city-card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg);
    border-color: var(--secondary-color);
}

.city-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: relative;
}

.city-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.city-card:hover .city-image img {
    transform: scale(1.1);
}

.city-card .city-icon {
    width: 50px;
    height: 50px;
    margin: -25px auto 15px;
    background: var(--gradient-ocean);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.3rem;
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
    position: relative;
    z-index: 2;
}

.city-card .city-name,
.city-card .city-country,
.city-card .city-time,
.city-card .city-desc {
    padding: 0 20px;
}

.city-card .city-name {
    margin-bottom: 8px;
}

.city-card .city-time {
    margin: 15px 20px 20px;
}

.highlight-card {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border: 3px solid var(--secondary-color);
    box-shadow: 0 4px 20px rgba(52, 152, 219, 0.2);
}

.highlight-card .city-icon {
    background: var(--gradient-sunset);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
}

.highlight-card:hover {
    box-shadow: 0 8px 32px rgba(52, 152, 219, 0.3);
    border-color: var(--accent-color);
}

.city-desc {
    font-size: 0.9rem;
    color: var(--light-text);
    margin-top: 8px;
    padding-bottom: 20px !important;
    font-style: italic;
}

.highlight-card .city-icon {
    background: var(--gradient-ocean);
}

.highlight-card .city-icon i {
    color: var(--white);
}

.city-desc {
    font-size: 0.9rem;
    color: var(--light-text);
    font-style: italic;
    margin-top: 10px;
}

.city-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto 20px;
    background: var(--gradient-ocean);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    font-size: 1.5rem;
}

.city-name {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: var(--dark-text);
}

.city-country {
    font-size: 0.9rem;
    color: var(--light-text);
    margin-bottom: 12px;
}

.city-time {
    display: inline-block;
    background: var(--light-bg);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--secondary-color);
    font-weight: 500;
}

/* =====================================================
   Itinerary Section
   ===================================================== */
.itinerary-section {
    padding: 80px 0;
    background: var(--white);
}

.itinerary-timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
}

.itinerary-timeline::before {
    content: '';
    position: absolute;
    left: 30px;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--secondary-color), var(--accent-color));
}

.timeline-item {
    position: relative;
    padding-left: 80px;
    margin-bottom: 50px;
}

.timeline-marker {
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    height: 60px;
    background: var(--gradient-ocean);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 8px rgba(52, 152, 219, 0.1);
    z-index: 2;
}

.day-number {
    color: var(--white);
    font-weight: 700;
    font-size: 0.9rem;
}

.timeline-content {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.timeline-content:hover {
    box-shadow: var(--shadow-lg);
    transform: translateX(5px);
}

.timeline-title {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

.timeline-time {
    color: var(--accent-color);
    font-weight: 600;
    margin-bottom: 15px;
    display: block;
}

.timeline-description {
    color: var(--light-text);
    margin-bottom: 20px;
    line-height: 1.7;
}

.timeline-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.highlight-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--light-bg);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    color: var(--secondary-color);
}

.highlight-tag i {
    font-size: 0.9rem;
}

/* =====================================================
   Pricing Section
   ===================================================== */
.pricing-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 40px;
}

.pricing-card {
    background: var(--white);
    border-radius: 20px;
    padding: 40px 30px;
    text-align: center;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.pricing-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: var(--gradient-ocean);
    transform: scaleX(0);
    transition: var(--transition);
}

.pricing-card:hover::before {
    transform: scaleX(1);
}

.pricing-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
}

.pricing-card.featured {
    border: 3px solid var(--secondary-color);
    transform: scale(1.05);
}

.pricing-card.premium {
    border: 3px solid var(--gold-color);
}

.pricing-card.sold-out {
    opacity: 0.6;
}

.featured-badge,
.sold-out-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--secondary-color);
    color: var(--white);
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
}

.sold-out-badge {
    background: var(--accent-color);
}

.pricing-header {
    margin-bottom: 30px;
}

.pricing-header i {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: 15px;
}

.pricing-type {
    font-size: 1.5rem;
    color: var(--dark-text);
    margin-bottom: 10px;
}

.pricing-price {
    margin-bottom: 30px;
    padding: 20px 0;
    border-top: 1px solid var(--light-bg);
    border-bottom: 1px solid var(--light-bg);
}

.price-currency {
    font-size: 1.5rem;
    vertical-align: top;
    color: var(--light-text);
}

.price-amount {
    font-size: 3rem;
    font-weight: 700;
    color: var(--dark-text);
}

.price-period {
    font-size: 1.2rem;
    color: var(--light-text);
}

.price-text {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
}

.pricing-features {
    list-style: none;
    margin-bottom: 30px;
    text-align: left;
}

.pricing-features li {
    padding: 12px 0;
    border-bottom: 1px solid var(--light-bg);
    display: flex;
    align-items: center;
    gap: 10px;
}

.pricing-features li:last-child {
    border-bottom: none;
}

.pricing-features i {
    color: var(--success-color);
    font-size: 1.1rem;
}

.pricing-card.sold-out .pricing-features i {
    color: var(--light-text);
}

.pricing-button {
    width: 100%;
    padding: 15px 30px;
    background: var(--gradient-ocean);
    color: var(--white);
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
}

.pricing-button:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(52, 152, 219, 0.4);
}

.pricing-button:disabled {
    background: var(--light-text);
    cursor: not-allowed;
}

.pricing-note {
    background: rgba(52, 152, 219, 0.1);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 15px;
    max-width: 800px;
    margin: 0 auto;
}

.pricing-note i {
    font-size: 1.5rem;
    color: var(--secondary-color);
}

/* =====================================================
   Inclusions Section
   ===================================================== */
.inclusions-section {
    padding: 80px 0;
    background: var(--white);
}

.inclusions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 40px;
}

.inclusions-box {
    background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
    padding: 40px;
    border-radius: 20px;
    box-shadow: var(--shadow-md);
}

.inclusions-box.exclusions {
    background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%);
}

.inclusions-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
}

.inclusions-header i {
    font-size: 2rem;
    color: var(--success-color);
}

.inclusions-box.exclusions .inclusions-header i {
    color: var(--accent-color);
}

.inclusions-header h3 {
    font-size: 1.8rem;
    color: var(--dark-text);
}

.inclusions-list {
    list-style: none;
}

.inclusions-list li {
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.05rem;
}

.inclusions-list li:last-child {
    border-bottom: none;
}

.inclusions-list i {
    font-size: 1.2rem;
    color: var(--success-color);
}

.inclusions-box.exclusions .inclusions-list i {
    color: var(--accent-color);
}

/* =====================================================
   Ship Section
   ===================================================== */
.ship-section {
    padding: 80px 0;
    background: var(--light-bg);
}

.ship-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.ship-image img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
}

.ship-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 40px;
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 15px;
    background: var(--white);
    padding: 20px;
    border-radius: 12px;
    box-shadow: var(--shadow-sm);
}

.stat-item i {
    font-size: 2rem;
    color: var(--secondary-color);
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--light-text);
}

.stat-value {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--dark-text);
}

.ship-features h4 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: var(--primary-color);
}

.feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}

.feature-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--white);
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.95rem;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.feature-tag:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
}

.feature-tag i {
    color: var(--secondary-color);
}

/* =====================================================
   Deck Plan Section
   ===================================================== */
.deck-plan-section {
    padding: 80px 0;
    background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
}

.deck-plan-section .section-title i {
    color: var(--secondary-color);
    margin-right: 10px;
}

.deck-overview {
    background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
    padding: 30px;
    border-radius: 16px;
    margin-bottom: 40px;
    border-left: 5px solid var(--secondary-color);
}

.deck-intro {
    font-size: 1.1rem;
    color: var(--dark-text);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    line-height: 1.7;
}

.deck-intro i {
    font-size: 1.5rem;
    color: var(--secondary-color);
}

.deck-intro strong {
    color: var(--accent-color);
}

.deck-list {
    display: grid;
    gap: 20px;
}

.deck-card {
    background: var(--white);
    border-radius: 16px;
    padding: 30px;
    box-shadow: var(--shadow-sm);
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 30px;
    transition: var(--transition);
    border-left: 5px solid var(--secondary-color);
}

.deck-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateX(5px);
}

.deck-card.top-deck {
    border-left-color: var(--gold-color);
    background: linear-gradient(135deg, #FFF9E6 0%, #FFE5B4 5%, #FFFFFF 15%);
}

.deck-card.highlight-deck {
    border-left-color: var(--accent-color);
    background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 5%, #FFFFFF 15%);
}

.deck-card.cabin-deck {
    border-left-color: var(--success-color);
    background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 5%, #FFFFFF 15%);
}

.deck-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    font-family: 'Playfair Display', serif;
}

.deck-card.top-deck .deck-number {
    color: var(--gold-color);
    background: rgba(243, 156, 18, 0.1);
}

.deck-card.highlight-deck .deck-number {
    color: var(--accent-color);
    background: rgba(231, 76, 60, 0.1);
}

.deck-card.cabin-deck .deck-number {
    color: var(--success-color);
    background: rgba(39, 174, 96, 0.1);
}

.deck-info h3 {
    font-size: 1.6rem;
    color: var(--primary-color);
    margin-bottom: 10px;
}

.deck-description {
    color: var(--light-text);
    font-size: 1.05rem;
    margin-bottom: 20px;
}

.deck-facilities {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

.deck-facilities li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 15px;
    background: var(--light-bg);
    border-radius: 8px;
    font-size: 0.95rem;
    transition: var(--transition);
}

.deck-facilities li:hover {
    background: rgba(52, 152, 219, 0.1);
    transform: translateX(5px);
}

.deck-facilities i {
    color: var(--secondary-color);
    font-size: 1.1rem;
    min-width: 20px;
}

.deck-legend {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    margin-top: 40px;
}

.deck-legend h4 {
    font-size: 1.3rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    text-align: center;
}

.legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    background: var(--light-bg);
    border-radius: 10px;
    font-size: 0.95rem;
    transition: var(--transition);
}

.legend-item:hover {
    background: rgba(52, 152, 219, 0.1);
    transform: scale(1.05);
}

.legend-item i {
    color: var(--secondary-color);
    font-size: 1.2rem;
}

/* =====================================================
   Booking Section
   ===================================================== */
.booking-section {
    padding: 80px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--white);
}

.booking-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
}

.booking-title {
    font-size: 2.5rem;
    margin-bottom: 20px;
    line-height: 1.3;
}

.booking-description {
    font-size: 1.1rem;
    margin-bottom: 40px;
    opacity: 0.95;
    line-height: 1.7;
}

.booking-benefits {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.benefit-item {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.1rem;
}

.benefit-item i {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.booking-form-container {
    background: var(--white);
    padding: 40px;
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
}

.kakao-contact {
    text-align: center;
}

.kakao-contact h3 {
    color: var(--primary-color);
    font-size: 1.8rem;
    margin-bottom: 20px;
}

.kakao-description {
    color: var(--light-text);
    font-size: 1.05rem;
    margin-bottom: 30px;
    line-height: 1.6;
}

.kakao-features {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px;
    flex-wrap: wrap;
}

.kakao-feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.kakao-feature i {
    font-size: 2rem;
    color: #FEE500;
    background: rgba(254, 229, 0, 0.1);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.kakao-feature span {
    font-size: 0.95rem;
    color: var(--dark-text);
    font-weight: 500;
}

.kakao-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background: #FEE500;
    color: #3C1E1E;
    padding: 20px 50px;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
    transition: var(--transition);
    box-shadow: 0 4px 16px rgba(254, 229, 0, 0.3);
    margin-bottom: 20px;
}

.kakao-button:hover {
    background: #FDD835;
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(254, 229, 0, 0.4);
}

.kakao-button i {
    font-size: 1.5rem;
}

.kakao-note {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--light-text);
    font-size: 0.9rem;
    margin-top: 20px;
}

.kakao-note i {
    color: var(--secondary-color);
}

.booking-form h3 {
    color: var(--primary-color);
    font-size: 1.8rem;
    margin-bottom: 30px;
    text-align: center;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    color: var(--dark-text);
    font-weight: 500;
}

.form-group label i {
    color: var(--secondary-color);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid var(--light-bg);
    border-radius: 10px;
    font-size: 1rem;
    font-family: 'Noto Sans KR', sans-serif;
    transition: var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.submit-button {
    width: 100%;
    padding: 18px;
    background: var(--gradient-ocean);
    color: var(--white);
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: var(--transition);
}

.submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(52, 152, 219, 0.4);
}

/* =====================================================
   Notes Section
   ===================================================== */
.notes-section {
    padding: 60px 0;
    background: #FFF9E6;
}

.notes-content h3 {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: var(--primary-color);
}

.notes-content h3 i {
    color: var(--gold-color);
    font-size: 2rem;
}

.notes-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.notes-list li {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    font-size: 1.05rem;
    padding: 15px;
    background: var(--white);
    border-radius: 10px;
    box-shadow: var(--shadow-sm);
}

.notes-list i {
    color: var(--gold-color);
    font-size: 1.2rem;
    margin-top: 3px;
}

/* =====================================================
   Footer
   ===================================================== */
.footer {
    background: var(--primary-color);
    color: var(--white);
    padding: 60px 0 30px;
}

.footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
}

.footer-section h4 {
    font-size: 1.3rem;
    margin-bottom: 20px;
}

.footer-section p {
    opacity: 0.8;
    line-height: 1.7;
}

.footer-section ul {
    list-style: none;
}

.footer-section ul li {
    margin-bottom: 12px;
    opacity: 0.8;
    transition: var(--transition);
}

.footer-section ul li:hover {
    opacity: 1;
    transform: translateX(5px);
}

.footer-section a {
    color: var(--white);
    text-decoration: none;
}

.social-links {
    display: flex;
    gap: 15px;
}

.social-links a {
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: var(--transition);
}

.social-links a:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
}

.footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0.7;
}

/* =====================================================
   Floating Action Buttons
   ===================================================== */
.fab-button {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--gradient-ocean);
    color: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: 0 8px 24px rgba(52, 152, 219, 0.4);
    z-index: 999;
    transition: var(--transition);
    text-decoration: none;
}

.fab-button:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 12px 32px rgba(52, 152, 219, 0.5);
}

.back-to-top {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--dark-text);
    color: var(--white);
    border: none;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    z-index: 998;
    transition: var(--transition);
}

.back-to-top.visible {
    display: flex;
}

.back-to-top:hover {
    transform: translateY(-5px);
    background: var(--secondary-color);
}

/* =====================================================
   Before Cruise Section
   ===================================================== */
.before-cruise-section {
    padding: 80px 0;
    background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
}

.before-cruise-section .section-title i {
    color: var(--secondary-color);
    margin-right: 10px;
}

.before-cruise-alert {
    background: linear-gradient(135deg, #FFF9E6 0%, #FFE5B4 100%);
    padding: 30px;
    border-radius: 16px;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 50px;
    border-left: 5px solid var(--gold-color);
    box-shadow: var(--shadow-sm);
}

.before-cruise-alert i {
    font-size: 2.5rem;
    color: var(--gold-color);
    margin-top: 5px;
}

.before-cruise-alert strong {
    font-size: 1.2rem;
    color: var(--primary-color);
    display: block;
    margin-bottom: 10px;
}

.before-cruise-alert p {
    color: var(--dark-text);
    font-size: 1.05rem;
    margin: 0;
}

.prep-section {
    background: var(--white);
    padding: 40px;
    border-radius: 20px;
    box-shadow: var(--shadow-md);
    margin-bottom: 30px;
    transition: var(--transition);
}

.prep-section:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
}

.prep-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid var(--light-bg);
}

.prep-header i {
    font-size: 2rem;
    color: var(--secondary-color);
    width: 50px;
    height: 50px;
    background: rgba(52, 152, 219, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.prep-header h3 {
    font-size: 1.6rem;
    color: var(--primary-color);
    margin: 0;
}

.prep-list {
    list-style: none;
    padding: 0;
}

.prep-list li {
    padding: 15px 0;
    border-bottom: 1px solid var(--light-bg);
    display: flex;
    align-items: flex-start;
    gap: 15px;
    font-size: 1.05rem;
    line-height: 1.7;
}

.prep-list li:last-child {
    border-bottom: none;
}

.prep-list i {
    color: var(--success-color);
    font-size: 1.2rem;
    margin-top: 3px;
    min-width: 20px;
}

/* Embarkation Highlight */
.embarkation-highlight {
    background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
    border: 3px solid var(--secondary-color);
}

.embarkation-alert {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 30px;
}

.embarkation-alert i {
    color: var(--accent-color);
    font-size: 1.5rem;
}

.embarkation-alert strong {
    color: var(--primary-color);
}

.embarkation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
    margin-top: 25px;
}

.embark-card {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.embark-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
}

.embark-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-ocean);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.embark-icon i {
    color: var(--white);
    font-size: 1.8rem;
}

.embark-card h4 {
    font-size: 1.3rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.embark-card ul {
    list-style: none;
    padding: 0;
}

.embark-card ul li {
    padding: 10px 0;
    padding-left: 25px;
    position: relative;
    line-height: 1.6;
}

.embark-card ul li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--success-color);
    font-weight: bold;
}

.embark-card ul li strong {
    color: var(--accent-color);
}

/* Checklist Grid */
.checklist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.checklist-card {
    background: linear-gradient(135deg, #F0F4F8 0%, #D9E2EC 100%);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
}

.checklist-card h4 {
    color: var(--primary-color);
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.checklist-card h4 i {
    color: var(--secondary-color);
}

.checklist-card ul {
    list-style: none;
    padding: 0;
}

.checklist-card ul li {
    padding: 10px 0;
    padding-left: 25px;
    position: relative;
    line-height: 1.6;
}

.checklist-card ul li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--secondary-color);
    font-size: 1.5rem;
    line-height: 1;
}

/* Apps Grid */
.apps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.app-category {
    background: linear-gradient(135deg, #FFF 0%, #F8F9FA 100%);
    padding: 25px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
}

.app-category h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.app-category h4 i {
    color: var(--secondary-color);
}

.app-tags {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.app-tag {
    background: var(--white);
    padding: 12px 16px;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95rem;
    transition: var(--transition);
    border: 2px solid transparent;
}

.app-tag:hover {
    border-color: var(--secondary-color);
    transform: translateX(5px);
}

.app-tag i {
    color: var(--secondary-color);
    font-size: 1.1rem;
}

/* Virgin Voyages App Section */
.virgin-app-section {
    background: linear-gradient(135deg, #FF0066 0%, #CC0052 100%);
    color: var(--white);
    border: none;
    box-shadow: 0 10px 40px rgba(255, 0, 102, 0.3);
}

.virgin-app-section .prep-header {
    color: var(--white);
}

.virgin-header h3 {
    color: var(--white);
}

.virgin-header i {
    color: var(--white);
}

.virgin-app-alert {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px 25px;
    border-radius: 12px;
    margin-bottom: 35px;
    display: flex;
    align-items: center;
    gap: 15px;
    border: 2px solid rgba(255, 255, 255, 0.3);
}

.virgin-app-alert i {
    font-size: 2rem;
    color: var(--white);
}

.virgin-app-alert p {
    margin: 0;
    font-size: 1.1rem;
    color: var(--white);
}

.virgin-app-preview {
    margin: 30px 0 40px 0;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.virgin-app-preview img {
    width: 100%;
    height: auto;
    display: block;
}

.app-download-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 30px;
}

.app-features h4 {
    color: var(--white);
    font-size: 1.5rem;
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.features-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.feature-item {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: var(--transition);
}

.feature-item:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(5px);
}

.feature-item i {
    font-size: 1.8rem;
    color: var(--white);
    min-width: 30px;
}

.feature-item strong {
    display: block;
    font-size: 1.1rem;
    margin-bottom: 5px;
    color: var(--white);
}

.feature-item p {
    margin: 0;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.5;
}

.app-download-buttons {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.app-download-buttons h4 {
    color: var(--white);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.app-search-guide {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    margin-bottom: 10px;
}

.search-method {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    color: var(--white);
}

.search-method i {
    font-size: 2rem;
    color: #FFD700;
    min-width: 30px;
    margin-top: 5px;
}

.search-method strong {
    font-size: 1.15rem;
    display: block;
    margin-bottom: 8px;
}

.search-method p {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.6;
}

.web-link-box {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 15px 20px;
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    text-align: center;
}

.web-link-box p {
    margin: 0;
    color: var(--white);
    font-size: 1rem;
}

.web-link-box a {
    color: #FFD700;
    text-decoration: underline;
    font-weight: 600;
}

.web-link-box a:hover {
    color: #FFF;
}

.download-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.download-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    background: var(--white);
    color: var(--dark-text);
    padding: 15px 25px;
    border-radius: 12px;
    text-decoration: none;
    transition: var(--transition);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.download-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.download-btn.ios {
    border: 2px solid #000;
}

.download-btn.android {
    border: 2px solid #3DDC84;
}

.download-btn i {
    font-size: 2.5rem;
}

.download-btn.ios i {
    color: #000;
}

.download-btn.android i {
    color: #3DDC84;
}

.download-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.download-text .small {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.download-text .large {
    font-size: 1.3rem;
    font-weight: 600;
}

.app-tips {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    margin-top: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.app-tips p {
    margin: 10px 0;
    font-size: 0.95rem;
    color: var(--white);
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.6;
}

.app-tips i {
    color: #FFD700;
    font-size: 1.2rem;
    min-width: 20px;
    margin-top: 2px;
}

/* Cruise Packing Guide (Notion Link) Section */
.packing-guide-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: var(--white);
    border: none;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.packing-guide-section .prep-header {
    color: var(--white);
}

.packing-header h3 {
    color: var(--white);
    font-size: 2rem;
}

.packing-header i {
    color: var(--white);
}

.packing-guide-content {
    margin-top: 20px;
}

.packing-intro {
    text-align: center;
    margin-bottom: 35px;
}

.packing-intro p {
    font-size: 1.15rem;
    color: var(--white);
    margin: 10px 0;
    line-height: 1.8;
}

.packing-features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}

.packing-feature-item {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: var(--transition);
    text-align: center;
}

.packing-feature-item:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px);
    border-color: rgba(255, 255, 255, 0.4);
}

.packing-feature-item i {
    font-size: 2.5rem;
    color: var(--white);
}

.packing-feature-item span {
    font-size: 1rem;
    color: var(--white);
    font-weight: 500;
}

.packing-cta {
    display: flex;
    justify-content: center;
    margin: 40px 0 30px 0;
}

.notion-link-btn {
    display: flex;
    align-items: center;
    gap: 20px;
    background: var(--white);
    color: #667eea;
    padding: 25px 40px;
    border-radius: 16px;
    text-decoration: none;
    transition: var(--transition);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
}

.notion-link-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.notion-link-btn .btn-icon {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.notion-link-btn .btn-icon i {
    font-size: 2rem;
    color: var(--white);
}

.btn-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
}

.btn-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 5px;
}

.btn-subtitle {
    font-size: 1rem;
    color: #764ba2;
    font-weight: 500;
}

.packing-tips-box {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px 25px;
    border-radius: 12px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 15px;
}

.packing-tips-box i {
    font-size: 1.8rem;
    color: #FFD700;
}

.packing-tips-box p {
    margin: 0;
    font-size: 1.05rem;
    color: var(--white);
    line-height: 1.6;
}

/* Tips Section */
.tips-section {
    background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
}

.tips-images-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    margin-bottom: 40px;
}

.tip-image-card {
    background: var(--white);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: var(--shadow-md);
    transition: var(--transition);
}

.tip-image-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.tip-image-card img {
    width: 100%;
    height: auto;
    min-height: 400px;
    max-height: 600px;
    object-fit: contain;
    display: block;
    background: #f5f5f5;
}

.tip-image-caption {
    padding: 25px;
    background: var(--white);
}

.tip-image-caption p {
    margin: 8px 0;
    line-height: 1.6;
}

.tip-image-caption p:first-child {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 12px;
}

.tip-image-caption p:last-child {
    font-size: 1rem;
    color: var(--dark-text);
}

.tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.tip-card {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    transition: var(--transition);
}

.tip-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
}

.tip-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-sunset);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.tip-icon i {
    color: var(--white);
    font-size: 1.8rem;
}

.tip-card h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.tip-card p {
    color: var(--dark-text);
    line-height: 1.7;
    margin-bottom: 15px;
}

.tip-card ul {
    list-style: none;
    padding: 0;
    margin-top: 15px;
}

.tip-card ul li {
    padding: 8px 0;
    padding-left: 25px;
    position: relative;
    line-height: 1.6;
}

.tip-card ul li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-weight: bold;
}

/* Packing Section */
.packing-section {
    background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%);
}

.packing-alert {
    background: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 12px;
    display: flex;
    align-items: flex-start;
    gap: 15px;
    margin-bottom: 30px;
}

.packing-alert i {
    color: var(--secondary-color);
    font-size: 1.5rem;
}

.packing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
}

.packing-card {
    background: var(--white);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
}

.packing-card h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.packing-card h4 i {
    color: var(--gold-color);
}

.packing-card ul {
    list-style: none;
    padding: 0;
}

.packing-card ul li {
    padding: 10px 0;
    padding-left: 25px;
    position: relative;
    line-height: 1.6;
}

.packing-card ul li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--success-color);
    font-weight: bold;
}

.packing-card a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 600;
}

.packing-card a:hover {
    text-decoration: underline;
}

/* Dress Code Section */
.dresscode-section {
    background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
}

.dresscode-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
}

.dress-card {
    background: var(--white);
    padding: 35px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    text-align: center;
}

.dress-icon {
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
}

.dress-icon i {
    color: var(--white);
    font-size: 2rem;
}

.dress-card h4 {
    color: var(--primary-color);
    font-size: 1.3rem;
    margin-bottom: 15px;
}

.dress-card p {
    color: var(--dark-text);
    line-height: 1.7;
}

.dress-card a {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 600;
}

.dress-card a:hover {
    text-decoration: underline;
}

/* Port Tips Grid */
.port-tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
}

.port-tip-card {
    background: linear-gradient(135deg, #FFF 0%, #E3F2FD 100%);
    padding: 30px;
    border-radius: 16px;
    box-shadow: var(--shadow-sm);
    text-align: center;
    transition: var(--transition);
}

.port-tip-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-5px);
}

.port-tip-card i {
    font-size: 3rem;
    color: var(--secondary-color);
    margin-bottom: 20px;
}

.port-tip-card h4 {
    color: var(--primary-color);
    font-size: 1.2rem;
    margin-bottom: 15px;
}

.port-tip-card p {
    color: var(--dark-text);
    line-height: 1.7;
    margin-bottom: 10px;
}

/* =====================================================
   Responsive Design
   ===================================================== */
@media (max-width: 1024px) {
    .hero-title {
        font-size: 3rem;
    }
    
    .ship-content,
    .booking-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .inclusions-grid {
        grid-template-columns: 1fr;
    }
    
    .route-cities {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .highlight-card {
        grid-column: span 2;
    }
    
    /* Packing Guide Tablet */
    .packing-features {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.2rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .info-grid,
    .route-cities {
        grid-template-columns: 1fr;
    }
    
    .highlight-card {
        grid-column: span 1;
    }
    
    .pricing-grid {
        grid-template-columns: 1fr;
    }
    
    .pricing-card.featured {
        transform: scale(1);
    }
    
    .itinerary-timeline::before {
        left: 20px;
    }
    
    .timeline-item {
        padding-left: 60px;
    }
    
    .timeline-marker {
        width: 40px;
        height: 40px;
        font-size: 0.8rem;
    }
    
    .ship-stats {
        grid-template-columns: 1fr;
    }
    
    .notes-list {
        grid-template-columns: 1fr;
    }
    
    .footer-content {
        grid-template-columns: 1fr;
    }
    
    /* Before Cruise Responsive */
    .embarkation-grid,
    .checklist-grid,
    .apps-grid,
    .tips-grid,
    .packing-grid,
    .dresscode-grid,
    .port-tips-grid {
        grid-template-columns: 1fr;
    }
    
    /* Tips Images Responsive */
    .tips-images-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .tip-image-card img {
        min-height: 300px;
        max-height: 500px;
    }
    
    .search-method {
        flex-direction: column;
        text-align: center;
    }
    
    .search-method i {
        margin: 0 auto;
    }
    
    /* Virgin App Responsive */
    .app-download-content {
        grid-template-columns: 1fr;
        gap: 30px;
    }
    
    /* Packing Guide Responsive */
    .packing-features {
        grid-template-columns: 1fr;
        gap: 15px;
    }
    
    .notion-link-btn {
        flex-direction: column;
        padding: 25px;
        text-align: center;
    }
    
    .btn-content {
        align-items: center;
    }
    
    .btn-title {
        font-size: 1.2rem;
    }
    
    .btn-subtitle {
        font-size: 0.9rem;
    }
    
    .packing-tips-box {
        flex-direction: column;
        text-align: center;
    }
    
    .prep-section {
        padding: 25px;
    }
    
    .before-cruise-alert {
        flex-direction: column;
    }
    
    /* Deck Plan Responsive */
    .deck-card {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .deck-number {
        font-size: 2rem;
        padding: 15px;
    }
    
    .deck-facilities {
        grid-template-columns: 1fr;
    }
    
    .legend-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 480px) {
    .hero {
        height: 80vh;
        min-height: 500px;
    }
    
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-subtitle {
        font-size: 1rem;
    }
    
    .cta-button {
        padding: 14px 32px;
        font-size: 1rem;
    }
    
    .quick-info {
        margin-top: 0;
    }
    
    .booking-form-container {
        padding: 25px;
    }
    
    .fab-button {
        width: 50px;
        height: 50px;
        bottom: 20px;
        right: 20px;
    }
    
    .back-to-top {
        bottom: 80px;
        right: 20px;
    }
}
