//1. Burger Navigation*
let navToggle = document.querySelector('.header--burger');
let iconToggle = document.querySelector('.header--toggle-icon');
let headerNav = document.querySelector('.header--nav');
let viewportWidth = window.innerWidth;

ICON_SRC = {
    burger: "img/icon-hamburger.svg",
    close: "img/icon-close.svg",
}

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




//2. Subscribe form validation
const submitBtn = document.querySelector('.submit-btn');
const emailInput = document.getElementById('email');
const emailError = document.querySelector('.email--error')
  
addEventListener('submit', function(event) {
    if (emailInput.value === '') {
        event.preventDefault();
        emailError.style.visibility = 'visible';
    } else {
        emailError.style.visibility = 'hidden';
    }
});






//3. Swipe testimonials

//Set --n, counting the children of the container
const container = document.querySelector('.testimonials--cards'),
        N = container.children.length;

container.style.setProperty('--n', N);


/*
TouchEvent.changedTouches property is a TouchList object that contains one 
Touch object for each touch point which contributed to the event.
*/

/*
The Touch.clientX read-only property returns the X coordinate of the 
touch point relative to the viewport, not including any scroll offset.
*/


//Return the first touch
function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };    

let x0 = null;
let locked = false;


function lock(e) { 
    x0 = unify(e).clientX  
    container.classList.toggle('smooth', !(locked = true))
};     


function drag(e) { 
    e.preventDefault();
    if(locked) {
        container.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
        // console.log( `tx: ${Math.round(unify(e).clientX - x0)}px`)
    }
};


let i = -1.5;
let w;

function size() { w = window.innerWidth };

function move(e) {
  if(locked) {
    //Detects the direction of movement
    let dx = unify(e).clientX - x0, s = Math.sign(dx),
    f = +(s*dx/w).toFixed(2);
    
    //Ranges were modified according to the standard positioning of the carousel
    if((i > -1.5 || s < 0) && (i < N - 2.5 || s > 0) && f > .2) {
        container.style.setProperty('--i', i -= s);
        f = 1 - f
    }
    
    container.style.setProperty('--tx', '0px');
    container.style.setProperty('--f', f);
    container.classList.toggle('smooth', !(locked = false));         
    // console.log(`dx: ${dx}, x0: ${x0}, s: ${s}, i: ${i}`);
    x0 = null
  }
};

size();

addEventListener('resize', size, false);


//Should triggered first
container.addEventListener('mousedown', lock, false); 
container.addEventListener('touchstart', lock, false);


container.addEventListener('mousemove', drag, false);
container.addEventListener('touchmove', drag, false);

//Should triggered last
container.addEventListener('mouseup', move, false);
container.addEventListener('touchend', move, false);

