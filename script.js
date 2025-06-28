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
    if (prevScrollPos > currentScrollPos){
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-11vh";
    }
    prevScrollPos = currentScrollPos;
}