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

// Service Worker Registration and Status Checking
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/order/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                
                // Check if there's an existing service worker
                if (registration.active) {
                    console.log('Service Worker is active');
                }

                // Listen for new service worker installation
                registration.addEventListener('install', function(event) {
                    console.log('Service Worker installed');
                });

                // Listen for service worker activation
                registration.addEventListener('activate', function(event) {
                    console.log('Service Worker activated');
                });

                // Check for updates
                registration.addEventListener('updatefound', function() {
                    const newWorker = registration.installing;
                    console.log('Service Worker update found!');
                    
                    newWorker.addEventListener('statechange', function() {
                        console.log('Service Worker state changed to:', newWorker.state);
                    });
                });
            })
            .catch(function(err) {
                console.error('ServiceWorker registration failed: ', err);
            });

        // Listen for controller change
        navigator.serviceWorker.addEventListener('controllerchange', function() {
            console.log('Service Worker controller changed');
        });

        // Check if the page is being controlled by a service worker
        if (navigator.serviceWorker.controller) {
            console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
        }
    });
} 
