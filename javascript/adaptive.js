window.addEventListener('DOMContentLoaded', function () { loadAdaptivePages() });
window.addEventListener(window.onresize, function () { loadAdaptivePages() });
//window.addEventListener('load', function () { loadLandingPage() });

var mobPrefix = "mob_";

function loadAdaptivePages() {
    var pathname = window.location.pathname;
    var pageName = pathname.split("/").pop();
    var mobileBreakpoint = 800;

    if (pageName == "" || pageName == null) {
        pageName = "index.html";
    }

    if (window.innerWidth <= mobileBreakpoint) {
        //If this is the wrong page, then load the mobile one
        if (pageName.search(mobPrefix) == -1) {
            pageName = mobPrefix + pageName;
            document.location = pageName;
        }
    }
    else if (window.innerWidth > mobileBreakpoint) {
        //If this is the wrong page, then load the normal one
        if (pageName.search(mobPrefix) != -1) {
            //Replace the string's name to exclude the mobile prefix
            pageName = pageName.replace(mobPrefix, "");
            document.location = pageName;
        }
    }

    //Getting rid of any wide-project squares
    if (window.innerWidth < 1100) {
        Array.from(document.querySelectorAll('.wide-project')).forEach((el) => el.classList.remove('wide-project'));
    }
}

/*
function loadLandingPage() {
    var mobLandingBreakpoint = 800;

    if (window.innerWidth < mobLandingBreakpoint) {
        mobLandingPage();
    }
    else if (window.innerWidth >= mobLandingBreakpoint) {
        compLandingPage();
    }
}

function mobLandingPage() {
    mobLanding = true;
    //Hide the computer home
    document.getElementById("home").classList.add("hidden");
}

function compLandingPage() {
    mobLanding = false;
    //Hide the mobile home
    document.getElementById("mob-home").classList.add("hidden");
}*/