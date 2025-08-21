// Waitlist button handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistBtn = document.getElementById('waitlistBtn');
    
    // Waitlist button click
    waitlistBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simulate waitlist join process
        waitlistBtn.disabled = true;
        waitlistBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="animate-spin" style="margin-right: 8px;">
                <path d="M21 12a9 9 0 11-6.219-8.56" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Joining waitlist...
        `;
        
        setTimeout(() => {
            waitlistBtn.disabled = false;
            waitlistBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
                    <path d="M20 6L9 17l-5-5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                You're on the list!
            `;
            
            showNotification('Welcome to the waitlist! We\'ll notify you when CHIDI is ready.', 'success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                waitlistBtn.innerHTML = 'Join our waitlist';
            }, 3000);
            
        }, 2000);
    });
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Theme toggle functionality
    const toggleContainer = document.querySelector('.theme-toggle-container');
    let isDarkMode = true; // Start with dark mode active
    
    toggleContainer.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            toggleContainer.classList.remove('light-mode');
        } else {
            document.body.classList.remove('dark-mode');
            toggleContainer.classList.add('light-mode');
        }
    });
    
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add smooth scrolling for any future anchor links
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
});

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: all 0.3s ease;
        z-index: 1000;
        max-width: 300px;
        font-size: 14px;
        font-weight: 500;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #10b981;
    }
    
    .notification-error {
        background: #ef4444;
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    
    .feature-card {
        transition: transform 0.2s ease;
    }
    
    /* Dark mode styles */
    body.dark-mode {
        background: #111827;
        color: #f9fafb;
    }
    
    body.dark-mode .main-heading {
        color: #f9fafb;
    }
    
    body.dark-mode .feature-card h3 {
        color: #f9fafb;
    }
    
    body.dark-mode .input-group {
        background: #1f2937;
        border-color: #374151;
    }
    
    body.dark-mode .email-input {
        color: #f9fafb;
    }
    
    body.dark-mode .email-input::placeholder {
        color: #6b7280;
    }
    
    body.dark-mode .theme-toggle {
        background: #374151;
    }
    
    body.dark-mode .theme-toggle:hover {
        background: #4b5563;
    }
`;
document.head.appendChild(style);
