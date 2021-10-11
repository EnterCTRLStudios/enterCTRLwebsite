var navbar = document.getElementById("navbar");

var navOpen = false;
var mobilePage = false;
var navIsFixed;

var currentScrollPos = window.pageYOffset;
var prevScrollPos = window.pageYOffset;
var hideNavOnScrollDist = 100;

var staticNavHeight = 0;
var fixedNavHeight = 0;
var delayNav = 175;

document.addEventListener("DOMContentLoaded", function () {
  //Is this a mobile page?
  mobilePage = isMobilePage();

  //Wait to setup after we know if its mobile or not
  if (!mobilePage) staticNavHeight = document.getElementById("navbar").offsetHeight;

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
        if (window.scrollY >= document.getElementById("sniperpunk").offsetHeight - document.getElementById("navbar").offsetHeight) {
          fixNav();
        }
      }
      //If the page is not past that number, then set back to normal
      else if (navIsFixed) {
        if (currentScrollPos > document.getElementById("sniperpunk").offsetHeight - document.getElementById("navbar").offsetHeight + hideNavOnScrollDist) {
          checkNavScroll(false);
        }

        if (window.scrollY < document.getElementById("sniperpunk").offsetHeight - document.getElementById("navbar").offsetHeight) {
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
    if (!isNavMobile) {
      document.getElementById("navbar").style.margin = -1 * document.getElementById("navbar").offsetHeight + "px 0 0 0";
    }
    else {
      console.log("HIDE NAVBAR");
      document.getElementById("mobile-nav").style.margin = -1 * document.getElementById("mobile-nav").offsetHeight + "px 0 0 0";
    }
  } else if (currentScrollPos < prevScrollPos) {
    if (!isNavMobile) {
      document.getElementById("navbar").style.margin = "0";
    }
    else {
      console.log("SHOW NAVBAR");
      document.getElementById("mobile-nav").style.margin = "0";
    }
  }
}

// Fixed Nav
function fixNav() {
  navIsFixed = true;
  if (!mobilePage) {
    //Save the height for when we reset the nav back to static at the top
    staticNavHeight = document.getElementById("navbar").offsetHeight;

    document.getElementById("navbar").classList.add("fixed-nav");
    document.getElementById("navbar").classList.remove("static-nav");
    document.getElementById("navbar").style.top = 0 + "px";
  }
  else {
    //Save the height for when we reset the nav back to static at the top
    staticNavHeight = document.getElementById("mobile-nav").offsetHeight;

    document.getElementById("mobile-nav").classList.add("mob-fixed-nav");
    document.getElementById("mobile-nav").classList.remove("mob-static-nav");
    document.getElementById("mobile-nav").style.top = 0 + "px";
  }
}

// Static Nav
function staticNav() {
  navIsFixed = false;

  if (!mobilePage) {
    //Save the height of last fixed nav
    fixedNavHeight = document.getElementById("navbar").offsetHeight;

    document.getElementById("navbar").classList.add("static-nav");
    document.getElementById("navbar").classList.remove("fixed-nav");
    document.getElementById("navbar").style.top = document.getElementById("sniperpunk").offsetHeight - staticNavHeight + "px";
  }
  else {
    document.getElementById("mobile-nav").classList.add("mob-static-nav");
    document.getElementById("mobile-nav").classList.remove("mob-fixed-nav");
    document.getElementById("mobile-nav").style.top = "0px";
  }
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
    document.getElementById("mobile-nav").style.margin = "0px";
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
      document.getElementById("mobile-nav").style.margin = "0px";
    }

    document.getElementById("nav-overlay").classList.add("hidden-nav-overlay");
    document.getElementById("bars").classList.remove("x-bars");
    navOpen = false;
  }, delayNav);
}

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - getElementById("navbar").offset().top
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });