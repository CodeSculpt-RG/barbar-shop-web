document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling ---
    // Select all links in the site-nav that start with #
    document.querySelectorAll('#site-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use scrollIntoView for smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // --- Close mobile menu after clicking a link ---
                const siteNav = document.getElementById('site-nav');
                const menuToggle = document.querySelector('.menu-toggle');
                if (siteNav && siteNav.classList.contains('active')) {
                    siteNav.classList.remove('active');
                    // Optionally change button icon back
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });


    // --- Sticky Header ---
    const header = document.getElementById('site-header');
    // Use the height of the first section after the header to trigger sticky
    // Fallback to a fixed value if no section is found right after header
    const stickyTriggerElement = header ? header.nextElementSibling : null;
    const triggerHeight = stickyTriggerElement ? stickyTriggerElement.offsetHeight * 0.1 : 100; // Trigger after scrolling 10% of the first section's height, or 100px

    function setStickyHeader() {
        if (header) {
            if (window.scrollY > triggerHeight) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', setStickyHeader);

    // Also call it once on page load in case the page is loaded scrolled down
    setStickyHeader();


    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.getElementById('site-nav');

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function() {
            siteNav.classList.toggle('active'); // Toggle 'active' class on the nav

            // Optional: Change the icon (e.g., hamburger to close icon)
            const icon = this.querySelector('i');
            if (icon) {
                if (siteNav.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times'); // Font Awesome 'times' is 'x' icon
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        // Close menu if clicked outside (optional, requires more complex logic)
        // Or close menu if window is resized while menu is open (simpler)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && siteNav.classList.contains('active')) {
                siteNav.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    }

    // --- Set Current Year in Footer ---
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

});