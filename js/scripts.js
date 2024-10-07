/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Portfolio functionality
    const projectsContainer = document.getElementById('projects-container');
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.classList.remove('d-none');
        }
        if (loadingSpinner) {
            loadingSpinner.classList.add('d-none');
        }
    }
    const backend = 'https://portfolio-backend-q9s6.vercel.app/';
   // const backend = 'http://localhost:5000/';

    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
                <div class="card">
                    <img src="${backend}${project.image}" alt="${project.name}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.description}</p>
                        <a href="${project.url}" class="btn btn-github">View on GitHub</a>
                    </div>
                </div>           
        `;
        return card;
    }

    // Load portfolio projects
    function loadPortfolioProjects() {
        if (!projectsContainer) return;

        fetch(backend+'api')
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return response.json();
            })
            .then(data => {

                if (loadingSpinner) {
                    loadingSpinner.classList.add('d-none');
                }
                
                data.portfolio.forEach((project, index) => {

                    const projectCard = createProjectCard(project, index);
                    projectsContainer.appendChild(projectCard);
                });
            })
            .catch(error => {
                showError('Error loading projects. Please try again later.');
                console.error('Error:', error);
            });
    }

    // World Time API integration
    function loadWorldTime() {
        const timeElement = document.getElementById("time-api-integration");
        if (!timeElement) return;

        fetch('https://worldtimeapi.org/api/ip')
            .then(response => response.json())
            .then(data => {
                timeElement.innerHTML = data.datetime;
            })
            .catch(error => {
                console.error('There was an error loading time!', error);
                timeElement.innerHTML = "Unable to load time";
            });
    }

    // Initialize both portfolio and time API
    loadPortfolioProjects();
    loadWorldTime();
});



