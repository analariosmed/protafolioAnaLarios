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

});


function apiIntegration() {
    //Request the current time based on your public IP (as JSON):
    fetch('https://worldtimeapi.org/api/ip')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("time-api-integration").innerHTML = data.datetime;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    document.getElementById("time-api-integration").innerHTML = "test";

    // call my own api
    fetch('https://portfolio-backend-q9s6.vercel.app/api')
        .then(response => response.json())
        .then(data => {
            //append the data to the html
            const myApiElement = document.createElement('div');
            myApiElement.textContent = data.portfolio;
            //for loop each element in the array
            data.portfolio.forEach(element => {
                const newElement = document.createElement('div');
                // console.log(element);
                newElement.textContent = element.description;
                myApiElement.appendChild(newElement);
                const link = document.createElement('a');
                link.href = element.url;
                link.textContent = element.url;
                myApiElement.appendChild(link);
            });
            document.getElementById("my-api-integration").appendChild(myApiElement);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

apiIntegration();