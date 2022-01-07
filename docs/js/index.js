//Select items
let navToggle = document.querySelector('.header--burger');
console.log(navToggle);

let iconToggle = document.querySelector('.header--toggle-icon');
console.log(iconToggle.src)

let headerNav = document.querySelector('.header--nav');
console.log(headerNav);

ICON_SRC = {
    burger: "img/icon-hamburger.svg",
    close: "img/icon-close.svg",
}

let viewportWidth = window.innerWidth;
console.log(viewportWidth)

const submitBtn = document.querySelector('.submit-btn');
console.log(submitBtn);

const emailInput = document.getElementById('email');
console.log(emailInput)

const emailError = document.querySelector('.email--error')
console.log(emailError)

//Show nav when clicking btn
addEventListener('click', () => {
    if (viewportWidth < 1099) {
        //Show/hide icon src
        iconToggle.classList.toggle('header--toggle-icon__close');
        iconToggle.src = ICON_SRC.close;

        if (iconToggle.classList.contains('header--toggle-icon__close')) {
            iconToggle.src = ICON_SRC.burger;
        } 

        //Show/hide nav
        headerNav.classList.toggle('header--nav__show');
    }
});
  
addEventListener('submit', function(event) {
    if (emailInput.value === '') {
        event.preventDefault();
        emailError.style.visibility = 'visible';
    }
});