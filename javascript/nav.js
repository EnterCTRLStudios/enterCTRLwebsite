var navOpen = false;
var mobilePage = false;
var navbarName = "";
var navIsFixed;

var currentScrollPos = window.pageYOffset;
var prevScrollPos = window.pageYOffset;
var hideNavOnScrollDist = 100;

var staticNavHeight = 0;
var fixedNavHeight = 0;
var delayNav = 200;
var linkAnimTime = 175;
var hideNavTopDelay = 750;

document.addEventListener("DOMContentLoaded", function () {
  //Is this a mobile page?
  mobilePage = isMobilePage();

  if (mobilePage) {
    navbarName = "mobile-nav";
  }
  else {
    navbarName = "navbar";
  }

  //Wait to setup after we know if its mobile or not
  if (!mobilePage) staticNavHeight = document.getElementById(navbarName).offsetHeight;

  if (mobilePage) {
    fixNav();
  }
  else {
    staticNav();
  }
});

window.onresize = function (event) {
  scrolling();
};

document.addEventListener("scroll", function () {
  scrolling();
});

//Looking for when someone clicks outside of the nav overlay
document.addEventListener("click", (event) => {
  let targetElement = event.target; // clicked element

  do {
    if (targetElement == document.getElementById("nav-overlay")) {
      // This is a click inside
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);

  // This is a click outside.
  if (mobilePage) {
    closeNav();
  }
});

function isMobilePage() {
  var pathname = window.location.pathname;
  var pageName = pathname.split("/").pop();
  var mobPrefix = "mob_";

  //If this is a mobile page
  if (pageName.search(mobPrefix) != -1) {
    return true;
  }
}

function scrolling() {
  if (!navOpen) {
    //Saving scroll positions for checkNavScroll()
    prevScrollPos = currentScrollPos;
    currentScrollPos = window.pageYOffset;

    //Below, checking if the page has passed the home section, and checking to hide nav on scroll

    //DESKTOP PAGES
    if (!mobilePage) {
      if (!navIsFixed) {
        if (window.scrollY >= document.getElementById("sniperpunk").offsetHeight - document.getElementById(navbarName).offsetHeight) {
          fixNav();
        }
      }
      //If the page is not past that number, then set back to normal
      else if (navIsFixed) {
        if (currentScrollPos > document.getElementById("sniperpunk").offsetHeight - document.getElementById(navbarName).offsetHeight + hideNavOnScrollDist) {
          checkNavScroll(false);
        }

        if (window.scrollY < document.getElementById("sniperpunk").offsetHeight - document.getElementById(navbarName).offsetHeight) {
          staticNav();
        }
      }
    }
    //MOBILE PAGES
    else {
      //Always have the nav as fixed for mobile
      if (!navIsFixed) {
        fixNav();
      }

      if (currentScrollPos > document.getElementById("sniperpunk").offsetHeight + hideNavOnScrollDist) {
        checkNavScroll(true);
      }
    }
  }
}

function checkNavScroll(isNavMobile) {
  //HIDE NAV ON SCROLL DOWN WHEN NAV IS FIXED TO TOP OF SCREEN
  if (currentScrollPos > prevScrollPos) {
    hideNavbar();

  } else if (currentScrollPos < prevScrollPos) {
    showNavbar();
  }
}

// Fixed Nav
function fixNav() {
  navIsFixed = true;
  if (!mobilePage) {
    //Save the height for when we reset the nav back to static at the top
    staticNavHeight = document.getElementById(navbarName).offsetHeight;

    document.getElementById(navbarName).classList.add("fixed-nav");
    document.getElementById(navbarName).classList.remove("static-nav");
    document.getElementById(navbarName).style.top = 0 + "px";
  }
  else {
    //Save the height for when we reset the nav back to static at the top
    staticNavHeight = document.getElementById(navbarName).offsetHeight;

    document.getElementById(navbarName).classList.add("mob-fixed-nav");
    document.getElementById(navbarName).classList.remove("mob-static-nav");
    document.getElementById(navbarName).style.top = 0 + "px";
  }
}

// Static Nav
function staticNav() {
  navIsFixed = false;

  if (!mobilePage) {
    //Save the height of last fixed nav
    fixedNavHeight = document.getElementById(navbarName).offsetHeight;

    document.getElementById(navbarName).classList.add("static-nav");
    document.getElementById(navbarName).classList.remove("fixed-nav");
    document.getElementById(navbarName).style.top = document.getElementById("sniperpunk").offsetHeight - staticNavHeight + "px";
  }
  else {
    document.getElementById(navbarName).classList.add("mob-static-nav");
    document.getElementById(navbarName).classList.remove("mob-fixed-nav");
    document.getElementById(navbarName).style.top = "0px";
  }
}

// For the little shake on each link
function navLinkPress(link) {

  if (mobilePage) {
    link.classList.add("crosshair-shake");

    setTimeout(() => {
      link.classList.remove("crosshair-shake");
    }, linkAnimTime);
  }

  setTimeout(() => {
    if (window.scrollY > hideNavOnScrollDist) hideNavbar();
  }, hideNavTopDelay);
}

// Open
function openNav() {
  if (navOpen) {
    closeNav();
  }
  else {
    setTimeout(() => {
      document.getElementById("nav-overlay").classList.remove("hidden-nav-overlay");
      document.getElementById("bars").classList.add("x-bars");
      navOpen = true;
    }, delayNav);
  }
}

// Close
function closeNav() {
  //If navIsFixed, then set it to the top of screen
  if (navIsFixed) {
    document.getElementById(navbarName).style.margin = "0px";
  }

  document.getElementById("nav-overlay").classList.add("hidden-nav-overlay");
  document.getElementById("bars").classList.remove("x-bars");
  navOpen = false;
}

// Close Delayed
function delayCloseNav() {
  setTimeout(() => {
    //If navIsFixed, then set it to the top of screen
    if (navIsFixed) {
      document.getElementById(navbarName).style.margin = "0px";
    }

    document.getElementById("nav-overlay").classList.add("hidden-nav-overlay");
    document.getElementById("bars").classList.remove("x-bars");
    navOpen = false;
  }, delayNav);
}

function hideNavbar() {
  document.getElementById(navbarName).style.margin = -1 * document.getElementById(navbarName).offsetHeight + "px 0 0 0";
}

function showNavbar() {
  document.getElementById(navbarName).style.margin = "0";
}