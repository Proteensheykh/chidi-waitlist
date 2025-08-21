// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    
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
    let isDarkMode = false; // Start with dark mode active
    
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
    
    // Modal functionality
    const waitlistModal = document.getElementById('waitlistModal');
    const successModal = document.getElementById('successModal');
    const waitlistBtn = document.getElementById('waitlistBtn');
    const closeModal = document.getElementById('closeModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const waitlistForm = document.getElementById('waitlistForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const waitlistCount = document.getElementById('waitlistCount');
    const userPosition = document.getElementById('userPosition');

    waitlistCount.textContent = 250;
    
    
    // Open modal when waitlist button is clicked
    waitlistBtn.addEventListener('click', function() {
        waitlistModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal functions
    function closeWaitlistModal() {
        waitlistModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        waitlistForm.reset();
    }
    
    function closeSuccessModalFunc() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    closeModal.addEventListener('click', closeWaitlistModal);
    closeSuccessModal.addEventListener('click', closeSuccessModalFunc);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === waitlistModal) {
            closeWaitlistModal();
        }
        if (event.target === successModal) {
            closeSuccessModalFunc();
        }
    });
    
    // Form submission
    waitlistForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        
        const formData = new FormData(waitlistForm);
        const data = {
            email: formData.get('email'),
            businessName: formData.get('businessName'),
            businessCategory: formData.get('businessCategory'),
            timestamp: new Date().toISOString()
        };
        
        try {
            // Use form data for Google Apps Script
            const formDataToSend = new FormData();
            formDataToSend.append('email', data.email);
            formDataToSend.append('businessName', data.businessName);
            formDataToSend.append('businessCategory', data.businessCategory);
            formDataToSend.append('timestamp', data.timestamp);
            
            const response = await fetch('https://script.google.com/macros/s/AKfycbxJ4WeklWeTnO-kycptYK1dyGVcfbMSRWakedLurS1pSHueaq3TIluwUl2WpQosT2Bl/exec', {
                method: 'POST',
                body: formDataToSend
            });
            
            if (response.ok) {
                //const result = await response.json();
                
                // Update waitlist count
                const currentCount = parseInt(waitlistCount.textContent);
                const newCount = currentCount + 1;
                waitlistCount.textContent = newCount;
                userPosition.textContent = newCount;
                
                // Close waitlist modal and show success modal
                closeWaitlistModal();
                successModal.style.display = 'block';
                
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
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
