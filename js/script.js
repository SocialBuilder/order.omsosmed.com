// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.header');
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('show');
        header.classList.toggle('menu-open');
        mobileMenuBtn.classList.toggle('active');
        
        // Change icon when menu is opened/closed
        const icon = mobileMenuBtn.querySelector('i');
        if (mainNav.classList.contains('show')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!header.contains(event.target) && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            header.classList.remove('menu-open');
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });
}); 
