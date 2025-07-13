function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex';
    }
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none';          
    }

    
var prevScrollPos = window.pageYOffset;
window.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
    const navbar = document.getElementById("navbar");
    // Show navbar if hidden
    if (navbar.style.display === "none") {
        navbar.style.display = "flex";
    }
    if (prevScrollPos > currentScrollPos){
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-11vh";
    }
    prevScrollPos = currentScrollPos;
}
var i = 0;
var barsInterval = null;

const barTargets = [100, 80, 25, 1, 1, 20, 1, 1];

function fillBars() {
    if (i === 0) {
        i = 1;
        var bars = [];
        for (let n = 1; n <= 8; n++) {
            bars.push(document.getElementById("bar" + n));
        }
        var width = 1;
        function frame() {
            let done = true;
            for (let n = 0; n < bars.length; n++) {
                let target = barTargets[n];
                let w = Math.min(width, target);
                bars[n].style.width = w + "%";
                bars[n].innerHTML = w + "%";
                if (width <= target) done = false;
            }
            if (width > 100 || done) {
                clearInterval(barsInterval);
                i = 0;
            } else {
                width++;
            }
        }
        barsInterval = setInterval(frame, 15);
        frame();
    }
}

function resetBars() {
    if (barsInterval) clearInterval(barsInterval);
    for (let n = 1; n <= 7; n++) {
        let bar = document.getElementById("bar" + n);
        if (bar) {
            bar.style.width = "0%";
            bar.innerHTML = "0%";
        }
    }
    i = 0;
}

const barsContainer = document.querySelector('#bars-animate');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            console.log('bars-animate in view:', entry.isIntersecting);
            if (entry.isIntersecting) {
                fillBars();
            } else {
                resetBars();
            }
        });
    },
    { threshold: 0.5 } 
);
if (barsContainer) {
    observer.observe(barsContainer);
}