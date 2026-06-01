/**
 * script.js - Portfolio Evgheni
 * Gestion de l'initialisation des icônes, navigation fluide et formulaire
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialisation des icônes Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Gestion du Smooth Scroll (Défilement fluide)
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = 80;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Effet visuel au Scroll sur la Navbar
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.borderBottom = "1px solid var(--primary)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        } else {
            nav.style.borderBottom = "1px solid var(--border)";
            nav.style.boxShadow = "none";
        }
    });

    // 4. Gestion du Formulaire de Contact via AJAX (Fetch)
    const contactForm = document.getElementById('contact-form');
    const status = document.getElementById('contact-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const button = contactForm.querySelector('.btn-submit');
            const originalBtnText = button.innerHTML;
            
            // État de chargement : on désactive le bouton
            button.disabled = true;
            button.innerHTML = '<span>Envoi en cours...</span>';

            // Récupération des données du formulaire
            const data = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Succès de l'envoi
                    status.innerHTML = "Merci ! Votre message a été envoyé avec succès.";
                    status.className = "status-message success";
                    contactForm.reset(); // On vide le formulaire
                } else {
                    // Erreur retournée par le serveur
                    const result = await response.json();
                    status.innerHTML = result.errors ? result.errors.map(error => error.message).join(", ") : "Oups ! Un problème est survenu.";
                    status.className = "status-message error";
                }
            } catch (error) {
                // Erreur de réseau (ex: pas d'internet)
                status.innerHTML = "Impossible de contacter le serveur. Vérifiez votre connexion.";
                status.className = "status-message error";
            } finally {
                // On réactive le bouton après l'envoi
                button.disabled = false;
                button.innerHTML = originalBtnText;
                
                // On fait disparaître le message de statut après 5 secondes
                setTimeout(() => {
                    status.style.opacity = '0';
                    setTimeout(() => { 
                        status.innerHTML = ""; 
                        status.style.opacity = '1'; 
                    }, 500);
                }, 5000);
            }
        });
    }
});