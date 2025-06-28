function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex';
    }
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none';          
    }
function stickyNav() {
    var headerHeight = document.querySelector("#stick").offsetHeight * 0.001;
    var navbar = document.querySelector("nav");
    var scrollValue = window.scrollY;

    if(scrollValue > headerHeight){
        navbar.classList.add("header-sticky")
    } else {
        navbar.classList.remove("header-sticky")
    }
}
window.addEventListener("scroll", stickyNav);

